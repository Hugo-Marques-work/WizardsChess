class GameBridge {
    constructor(gameId, white, otherUser, parentDom, width, height, login, password,
        onMyTurnHandler, onDraw, onWin, onDrop, currentTurn) {
        //Here to possibly use on the interface
        //parentDom.hidden = false;        

        this.createRenderer(parentDom, width, height);
        this.mouseIsDown = false;
        this.currentTurn = currentTurn;
        this.onMyTurnHandler = onMyTurnHandler;
        this.imWhite = white;
        this.serverCommunicator = new ServerCommunicator(SERVER_IP, true, login, password, gameId, onDraw, onWin, onDrop);
        this.gameId = gameId;
        this.otherUser = otherUser;
        this.mouseBlocked = false;
        this.blackDead = [];
        this.whiteDead = [];
        this.createBinds();
        this.serverCommunicator.importGame(gameId, this.importGameCompleteFunc);
        this.loopBind = this.loop.bind(this);
        this.active = true;
    }
    
    getDomElement () {
        return this.renderer.domElement;
    }
    
    async initialization() {

        this.createScene();        
        this.createCamera();
        this.serverCommunicator.readyGameStatus(this);        

        this.changeTurn = {change: false, myTurn: true};

        this.rayCaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.move = { from : null, toPos : null };
        this.waitingForResponse = true;
        
        document.getElementById("rightMenuTurnCount").innerHTML = this.currentTurn;
        if(this.imWhite == this.game.whiteTurn) {
            this.setMyTurn();
            this.currentTurn--;
        }
        else {
            while(this.waitingForResponse==true)
                await sleep(10);
            this.setOtherTurn();
            this.currentTurn--;
        }           
        document.getElementById("rightMenuTurnCount").innerHTML = this.currentTurn;
        
        this.timer = new Date();

        this.nFrames = 0;
        this.fps();

        this.readyForLoop = true;
        this.loop();
    }

    setActive(active) {
        this.active = active;
        if(active) this.loop();
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

        this.camVec = new Vector3(25,25,25);
        this.zoomIndex = 2;
        this.handleZoom();

        this.camera.lookAt(this.scene.position);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    readyMove() {
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
            console.log(exception);

            //We can display a message according to the exception that makes the move impossible
            this.move.from = null;
            this.move.toPos = null;
        }
    }

    moveComplete(gameMoveAnswer) {
        if (gameMoveAnswer instanceof GameMoveAnswerError)
        {
            if (gameMoveAnswer.errId == 'INVALID_ACTION')
            {
                switch (gameMoveAnswer.status) 
                {
                    case 'WAITING_FOR_PROMOTION_STATE':
                        this.readyPromote();
                        break;
                    case 'DRAW_STATE':
                        this.onDraw (this.gameId)
                        break;
                    case 'WIN_STATE':
                        this.onWin (this.gameId, gameMoveAnswer.winner);
                        break;
                    case 'DROP_STATE':
                        this.onDrop (this.gameId);
                        break;
                }
                
            } 
            else if (gameMoveAnswer.errId == "NOT_YOUR_TURN") 
                document.getElementById('rightMenuMessage').innerHTML = "It is not your turn.";
            
            else if (gameMoveAnswer.errId == "NO_SUCH_PIECE") 
                document.getElementById('rightMenuMessage').innerHTML = "The server could not find that piece.";
                
            else if (gameMoveAnswer.errId == "PIECE_NOT_YOURS")
                document.getElementById('rightMenuMessage').innerHTML = "The piece is not yours.";
            
            else if (gameMoveAnswer.errId == "INVALID_MOVE")S
                document.getElementById('rightMenuMessage').innerHTML = "The move you requested is invalid."; 
            
        } 
        
        else 
            this.executeMove();
        
        
        this.waitingForResponse = false;
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
        this.state = new MyTurnState(this);
        this.move.from = null;
        this.move.to = null;
        this.move.toPos = null;
    }

    getWhite() {
        return this.imWhite;
    }

    fps() {
        var that = this;
        console.log(this.nFrames);
        this.nFrames = 0;
        setTimeout(function () {
            that.fps();
        }, 1000);
    }

    update() {
        this.getDomElement().removeEventListener("mousemove",this,false);

        var deltaTime = new Date() - this.timer;

        this.checkChangeTurn();

        if(this.mouseDown) {
            this.state.handleMouseClick();
            this.mouseDown = false;
        }

        this.game.update(deltaTime);
        this.state.update(deltaTime);
        this.timer = new Date();
        this.nFrames++;
        
        this.getDomElement().addEventListener("mousemove",this,false);

    }

    onMouseMovement(e) {
        e.preventDefault();
        let canvasBounds = this.renderer.context.canvas.getBoundingClientRect();
        if(canvasBounds==undefined) return;
        if(this.mouse==undefined) return;
        var lastMouse = { x : this.mouse.x, y : this.mouse.y };
        this.mouse.x = ( ( event.clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
        this.mouse.y = - ( ( event.clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top) ) * 2 + 1;
        //console.log(this.mouse);
        //this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        //this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
        
        /*if(this.mouseIsDown) {
            var xFactor = new THREE.Vector3(this.mouse.x - lastMouse.x/2,0,
                this.mouse.x - lastMouse.x/2);
            //xFactor.rotateY(Math.PI/4);
            
            var yFactor = new THREE.Vector3(0,0,this.mouse.y-lastMouse.y);
            //yFactor.rotateY(Math.PI/4);
            
            this.scene.position.set(this.scene.position.x + xFactor.x,
                this.scene.position.x + xFactor.y, this.scene.position.z + xFactor.z);
            
            this.scene.position.set(this.scene.position.x + yFactor.x,
                this.scene.position.x + yFactor.y, this.scene.position.z + yFactor.z);
        }*/
    }

    onMouseDown(e) {
        //this.mouseIsDown = true;
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
        //this.mouseIsDown = false;
        //Not sure if we should use it
    }

    zoomIn() {
        if(this.zoomIndex>4) {
            this.zoomIndex--;
        }
        this.zoomIndex/=2;
        this.handleZoom();
    }

    zoomOut() {
        if(this.zoomIndex>=4) {
            this.zoomIndex++;
        }
        else {
            this.zoomIndex*=2;
        }
        this.handleZoom();
    }

    handleZoom() {
        if(this.imWhite)
            this.camera.position.set(this.camVec.x * this.zoomIndex,
                this.camVec.y * this.zoomIndex, -this.camVec.z * this.zoomIndex);
        else   
            this.camera.position.set(this.camVec.x * this.zoomIndex,
                this.camVec.y * this.zoomIndex, this.camVec.z * this.zoomIndex);
    

        this.camera.lookAt(this.scene.position);
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
    
    async loop () {
        while(this.readyForLoop==false)
            await sleep(100);
        if(this.active)
        {
            this.update();
            this.render();
            requestAnimationFrame(this.loopBind);
        }
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }