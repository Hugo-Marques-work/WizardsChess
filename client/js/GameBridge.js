class GameBridge {
    constructor(serverCommunicator, gameId, white, otherUser, game) {
        //Here to possibly use on the interface
        this.gameId = gameId;
        this.otherUser = otherUser;

        this.createRenderer();
        this.createScene();

        this.serverCommunicator = serverCommunicator;
        this.changeTurn = {change: false, myTurn: true};
        this.imWhite = white;
        this.handleGame(game);

        this.rayCaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.move = { from : null, toPos : null };
        this.waitingForResponse = false;

        if(this.imWhite == this.game.whiteTurn) {
            this.setMyTurn();
        }
        else {
            this.setOtherTurn();
        }
        

        this.createCamera();

        window.addEventListener("keydown",this);
        window.addEventListener("keyup",this);
        window.addEventListener("resize",this);
        window.addEventListener("mousedown",this);
        window.addEventListener("mousemove",this,false);
        window.addEventListener("mouseup",this);

        this.timer = new Date();
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer( {antialias: true} );
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color()
        this.scene.add(new THREE.AxisHelper(10));
    }

    handleGame(game) {
        if(game == undefined) {
            this.game = new Game(this.serverCommunicator.gameId, true);
        } else {
            this.game = game;
        }

        this.scene.add(this.game.chessMatrix.visual);
        var visualPieces = this.game.getVisualPieces();

        for(var piece in visualPieces) {
            this.scene.add(visualPieces[piece]);
        }
    }

    createCamera() {
        var fov1 = 15;
        this.camera = new THREE.PerspectiveCamera( fov1, window.innerWidth / window.innerHeight, 1, 1000 );
        //var fov1 = 10;
        //this.camera = new THREE.OrthographicCamera( - fov1 * window.innerWidth / window.innerHeight, 
        //    fov1 * window.innerWidth / window.innerHeight, fov1, -fov1, -100, 100);

        if(this.imWhite)
            this.camera.position.set(0, 50, -50 );
        else            
            this.camera.position.set(0, 50, 50 );

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
                    this.move.toPos.y);
            }
            else {
                //Actually impossible
                this.move.from = null;
                this.move.toPos = null;
            }
            

        } catch ( exception ) {

            //DEBUG FIXME
            alert(exception);
            console.log(exception);

            //We can display a message according to the exception that makes the move impossible
            this.move.from = null;
            this.move.toPos = null;
        }
    }

    executeMove() {        
        //can be state not much point tho
        this.game.move(this.move.from.getBoardPos(), this.move.toPos);
        this.move.from = null;
        this.move.toPos = null;
        this.waitingForResponse = false;
        this.readyOtherTurn();
    }

    readyPromote() {
        this.game.move(this.move.from.getBoardPos(), this.move.toPos);
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
        this.serverCommunicator.draw();
    }

    readyDrop() {
        this.serverCommunicator.drop();
    }

    readyOtherTurn() {
        this.changeTurn.change = true;
        this.changeTurn.myTurn = false;
    }

    readyMyTurn(gameLastMove) {
        this.changeTurn.change = true;
        this.changeTurn.myTurn = true;
        this.move.from = gameLastMove.from;
        this.move.toPos = gameLastMove.to;
    }

    checkChangeTurn() {
        if(this.changeTurn.change) {
            this.changeTurn.change = false;

            if(this.changeTurn.myTurn) {
                this.game.move(this.move.from, this.move.toPos);
                this.setMyTurn();
            }
            else {
                this.setOtherTurn();
            }
        }
    }

    setOtherTurn() {
        this.state = new OtherTurnState(this);
        this.serverCommunicator.setOtherTurn();
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
        this.timer = new Date();
    }

    onMouseMovement(e) {
        e.preventDefault();
        this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    }

    onMouseDown(e) {
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

    onKeyUp(e) {}
    onKeyDown(e) {}
    onResize(e) {}

    handleEvent(e) {
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

            case "resize":
                this.onResize(e);
                break;

            case "keyup":
                this.onKeyUp(e);
                break;

            case "keydown":
                this.onKeyDown(e);
                break;
        }
    }
}


function loop() {
    gameBridge.update();
    gameBridge.render();
    requestAnimationFrame(loop);
}