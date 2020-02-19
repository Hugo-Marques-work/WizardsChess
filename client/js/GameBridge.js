class GameBridge {
    constructor(gameId, white, otherUser, parentDom, width, height, login, password, onMyTurnHandler, onDraw, onWin, onDrop) {
        //Here to possibly use on the interface
        this.createRenderer(parentDom, width, height);
        this.onMyTurnHandler = onMyTurnHandler;
        this.imWhite = white;
        this.serverCommunicator = new ServerCommunicator("ws://0.0.0.0:8000", true, login, password, gameId, onDraw, onWin, onDrop);
        this.gameId = gameId;
        this.otherUser = otherUser;
        this.mouseBlocked = false;
        this.blackDead = [];
        this.whiteDead = [];
        this.createBinds();
        this.serverCommunicator.importGame(gameId, this.importGameCompleteFunc);
        this.loopBind = this.loop.bind(this);
    }
    
    getDomElement () {
        return this.renderer.domElement;
    }
    
    initialization() {

        this.createScene();

        this.changeTurn = {change: false, myTurn: true};

        this.rayCaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.move = { from : null, toPos : null };
        this.waitingForResponse = true;

        if(this.imWhite == this.game.whiteTurn) {
            this.setMyTurn();
        }
        else {
            this.setOtherTurn();
        }
        
        this.createCamera();

        this.timer = new Date();

        this.serverCommunicator.readyGameStatus();
        this.loop();
    }
    
    captureMouse () {
        var dom = document.getElementById("loggedScreenPlay" + this.gameId);
        dom.addEventListener("keydown",this);
        dom.addEventListener("keyup",this);
        dom.addEventListener("mousedown",this);
        dom.addEventListener("mousemove",this,false);
        dom.addEventListener("mouseup",this);
    }
    
    releaseMouse () {
        var dom = document.getElementById("loggedScreenPlay" + this.gameId);
        dom.removeEventListener("keydown",this);
        dom.removeEventListener("keyup",this);
        dom.removeEventListener("mousedown",this);
        dom.removeEventListener("mousemove",this,false);
        dom.removeEventListener("mouseup",this);
    }

    createBinds() {
        this.moveCompleteFunc = GameBridge.prototype.moveComplete.bind(this);
        this.moveFinishFunc = GameBridge.prototype.finishMove.bind(this);
        this.promoteFinishFunc = GameBridge.prototype.finishPromote.bind(this);
        this.drawCompleteFunc = GameBridge.prototype.drawComplete.bind(this);
        this.readyMyTurnFunc = GameBridge.prototype.readyMyTurn.bind(this);
        this.importGameCompleteFunc = GameBridge.prototype.importGameComplete.bind(this);
        this.askOtherTurnFunc = GameBridge.prototype.askOtherTurnComplete.bind(this);
        this.setMyTurnFunc = GameBridge.prototype.setMyTurn.bind(this);
    }

    createRenderer(parentDom, width, height) {
        this.renderer = new THREE.WebGLRenderer( {antialias: true} );
        this.renderer.setSize(width, height);
        parentDom.appendChild(this.renderer.domElement);
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xe0d6b4);

        //game stuff
        this.scene.add(this.game.chessMatrix.visual);
        var visualPieces = this.game.getVisualPieces();

        for(var piece in visualPieces) {
            this.scene.add(visualPieces[piece]);
            console.log(visualPieces[piece]);
        }
    }

    importGameComplete(importedGameInfo) {

        this.game = importedGameInfo.importedGame;
        
        this.initialization();
    }

    createCamera() {
        var fov1 = 15;
        this.camera = new THREE.PerspectiveCamera( fov1, window.innerWidth / window.innerHeight, 1, 1000 );
        //var fov1 = 10;
        //this.camera = new THREE.OrthographicCamera( - fov1 * window.innerWidth / window.innerHeight, 
        //    fov1 * window.innerWidth / window.innerHeight, fov1, -fov1, -100, 100);

        if(this.imWhite)
            this.camera.position.set(50, 50, -50 );
        else            
            this.camera.position.set(50, 50, 50 );

        this.camera.lookAt(this.scene.position);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    readyMove() {
        //FIXME
        //CHECK IF MOVE IS POSSIBLE THEN ASK SERVER AND THEN EXECUTE
        try {

            if(this.game.checkMove(this.move.from.getBoardPos(),
                this.move.toPos)) {
                
                this.waitingForResponse = true;
                this.serverCommunicator.move(this.game.gameId, this.move.from.getBoardPos().x,
                    this.move.from.getBoardPos().y, this.move.toPos.x, 
                    this.move.toPos.y, this.moveCompleteFunc);
            }
            else {
                //Actually impossible
                this.move.from = null;
                this.move.toPos = null;
            }
            

        } catch ( exception ) {

            //DEBUG FIXME
            //alert(exception);
            console.log(exception);

            //We can display a message according to the exception that makes the move impossible
            this.move.from = null;
            this.move.toPos = null;
        }
    }

    moveComplete(gameMoveAnswer) {
        if (gameMoveAnswer instanceof ErrorAnswerException) {
            if (gameMoveAnswer.errId == 'INVALID_ACTION') {
                this.serverCommunicator.readyGameStatus();
            }
        } else {

            if (gameMoveAnswer.info == 'PLAYING_STATE') {
                this.executeMove();
            }
            else if (gameMoveAnswer.info == 'WAITING_FOR_PROMOTION_STATE' ) {
                this.readyPromote();
            }
            else if (gameMoveAnswer.info == 'DRAW_STATE' ) {
                this.onDraw (this.gameId)
            }
            else if (gameMoveAnswer.info == 'WIN_STATE' ) {
                this.onWin (this.gameId, gameMoveAnswer.winner);
            }
            else if (gameMoveAnswer.info == 'DROP_STATE' ) {
                this.onDrop (this.gameId);
            }

         }
    }

    executeMove() {        
        //can be state not much point tho
        var deadPiece = this.game.getCell(this.move.toPos);
        this.game.move(this.move.from.getBoardPos(), this.move.toPos);
        this.animateMove(deadPiece,this.moveFinishFunc);
    }

    animateMove(deadPiece,func) {
        this.state = new AnimationState(this, this.move, deadPiece, func);

        //To Do After Animate
    }

    finishMove() {
        this.move.from = null;
        this.move.to = null;
        this.waitingForResponse = false;
        this.readyOtherTurn();
    }

    readyPromote() {        
        var deadPiece = this.game.getCell(this.move.toPos);
        this.game.move(this.move.from.getBoardPos(), this.move.toPos);
        this.animateMove(deadPiece, this.promoteFinishFunc);
    }

    finishPromote() {
        this.state = new PromotionState(this,this.state);
        this.move.from = null;
        this.move.toPos = null;
        this.waitingForResponse = false;
    }

    executePromote(piece) {
        this.game.promote(piece);
        this.readyOtherTurn();
    }

    readyDraw() {
        this.serverCommunicator.draw(this.drawCompleteFunc);
    }

    drawComplete() {

    }

    closeSocket() {
        this.serverCommunicator.closeSocket();
    }

    readyOtherTurn() {
        this.changeTurn.change = true;
        this.changeTurn.myTurn = false;
    }

    readyMyTurn(gameLastMove) {
        this.changeTurn.change = true;
        this.changeTurn.myTurn = true;
        this.move.from = this.game.getCell(gameLastMove.from).visual;
        console.log(this.move.from);
        console.log(gameLastMove.from);
        console.log(this.move.from.getBoardPos());
        this.move.toPos = gameLastMove.to;
        this.onMyTurnHandler(this.gameId);
    }

    checkChangeTurn() {
        if(this.changeTurn.change) {
            this.changeTurn.change = false;

            if(this.changeTurn.myTurn) {

                var deadPiece = this.game.getCell(this.move.toPos);
                //FIXME
                this.game.move(this.move.from.getBoardPos(), this.move.toPos);
                this.animateMove(deadPiece,this.setMyTurnFunc);
            }
            else {
                this.setOtherTurn();
            }
        }
    }

    setOtherTurn() {
        this.state = new OtherTurnState(this);
        this.serverCommunicator.setOtherTurn(this, this.askOtherTurnFunc);
        var that = this;
        this.askOtherTurn();
    }

    askOtherTurn() {
        if(this.waitingForResponse) return;

        this.serverCommunicator.askOtherTurn(this.gameId);
        var that = this;
        this.askOtherTurnTimeout = setTimeout(function () {
            that.askOtherTurn();
        }, 1000);
    }

    askOtherTurnComplete(otherTurnAnswer) {
        this.waitingForResponse = false;
        if ( otherTurnAnswer.white == this.getWhite() ) {
            clearTimeout(this.askOtherTurnTimeout);
            this.serverCommunicator.askLastMove(this.gameId, this.readyMyTurnFunc);
            return;
        }
    }

    setMyTurn() {
        //FIXME Haven't changed everything with this cuz it doesn't need communication with server. Overview it
        this.state = new MyTurnState(this);
        this.move.from = null;
        this.move.to = null;
        this.move.toPos = null;
    }

    getWhite() {
        return this.imWhite;
    }

    update() {
        var deltaTime = new Date() - this.timer;

        this.checkChangeTurn();

        if(this.mouseDown) {
            this.state.handleMouseClick();
            this.mouseDown = false;
        }

        this.game.update(deltaTime);
        this.state.update(deltaTime);
        this.timer = new Date();
    }

    onMouseMovement(e) {
        e.preventDefault();
        let canvasBounds = this.renderer.context.canvas.getBoundingClientRect();
        if(canvasBounds==undefined) return;
        this.mouse.x = ( ( event.clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
        this.mouse.y = - ( ( event.clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top) ) * 2 + 1;
        //this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        //this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    }

    onMouseDown(e) {
        document.getElementById('loggedScreenEntry' + this.gameId).style.backgroundColor = "rgb(150, 150, 150)";
        
        e.preventDefault();
        console.log("MouseDown");
        this.rayCaster.setFromCamera( this.mouse, this.camera );

        // calculate objects intersecting the picking ray
        var intersectsPiece =  this.rayCaster.intersectObjects( this.game.getVisualPieces(), true );
        
        var intersectsTile = this.rayCaster.intersectObjects( this.game.getBoardVisualTiles(), true);

        this.mouseDown = true;
        this.intersects = { pieces: intersectsPiece, tiles: intersectsTile };
    }

    onMouseUp(e) {
        //Not sure if we should use it
    }
    
    resize (w, h) {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        if (window.innerHeight > 0 && window.innerWidth > 0) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        }
    }

    onKeyUp(e) {}
    onKeyDown(e) {}
    
    blockMouse () {
        this.mouseBlocked = true;
    }

    handleEvent(e) {
        
        if (this.mouseBlocked)
            return;
        
        switch(e.type) {
            
            case "mousedown":
                this.onMouseDown(e);
                break;

            case "mousemove":
                this.onMouseMovement(e);
                break;

            case "mouseup":
                this.onMouseUp(e);
                break;

            case "keyup":
                this.onKeyUp(e);
                break;

            case "keydown":
                this.onKeyDown(e);
                break;
        }
    }
    
    loop () {
        this.update();
        this.render();
        requestAnimationFrame(this.loopBind);
    }
}
