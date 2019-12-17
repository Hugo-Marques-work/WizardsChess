class GameBridge {
    constructor(serverCommunicator) {
        this.createRenderer();
        this.createScene();
        this.createCamera();

        this.rayCaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.move = { from : null, toPos : null };
        this.waitingForResponse = false;
        this.serverCommunicator = serverCommunicator;
        this.state = new MyTurnState(this);
        /*window.addEventListener("keydown",this.onKeyDown);
        window.addEventListener("keyup",this.onKeyUp);
        window.addEventListener("resize",this.onResize);
        window.addEventListener("onmousedown",this.onMouseDown);
        window.addEventListener("onmousemove",this.onMouseMovement);
        window.addEventListener("onmouseup",this.onMouseUp);*/
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
        this.game = new Game(/*FIXME*/);
        this.scene.add(this.game.chessMatrix.visual);
        var visualPieces = this.game.getVisualPieces();
        for(var piece in visualPieces) {
            this.scene.add(visualPieces[piece]);
        }
        this.scene.add(new THREE.AxisHelper(10));
    }

    createCamera() {
        var fov1 = 15;
        this.camera = new THREE.PerspectiveCamera( fov1, window.innerWidth / window.innerHeight, 1, 1000 );
        //var fov1 = 10;
        //this.camera = new THREE.OrthographicCamera( - fov1 * window.innerWidth / window.innerHeight, 
        //    fov1 * window.innerWidth / window.innerHeight, fov1, -fov1, -100, 100);
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
                this.serverCommunicator.move(this.move.from.getBoardPos(),
                    this.move.toPos);
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

    executeMove() {
        //can be state not much point tho
        this.game.move(this.move.from.getBoardPos(), this.move.toPos);
        this.move.from = null;
        this.move.toPos = null;
        this.waitingForResponse = false;
    }

    readyDraw() {
        this.serverCommunicator.draw();
    }

    readyDrop() {
        this.serverCommunicator.drop();
    }

    update() {
        var deltaTime = new Date() - this.timer;

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
        
        console.log(intersectsPiece);
        var intersectsTile = this.rayCaster.intersectObjects( this.game.getBoardVisualTiles(), true);
        console.log(intersectsTile);

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