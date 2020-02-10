class PieceVisual extends THREE.Object3D {
    constructor(logic) {
        super();
        this.myX = 0;
        this.myY = 0;
        this.myZ = 0;
        this.whiteColor = 0xf0eedd;
        this.blackColor = 0x383733;                
        this.killableColor = 0xff0000; 
 


        this.logic = logic;

        this.mesh;
        //this.makeVisual();

        var v = this.logic.translatePosIntoVisual();
        this.position.set(v.x,v.y,v.z);

        this.state = new PieceIdleState(this);
    }

    makeVisual() {
        //virtual
    }

    setKillable() {
        this.mesh.material = this.killableMaterial;
    }

    setHighlight(activate) {
        if(activate) {
            this.mesh.material = this.highlightMaterial;
        } else {
            this.mesh.material = this.normalMaterial;
        }
    }
    
    changePos() {
        var v = this.logic.translatePosIntoVisual();
        this.position.set(v.x + this.myX,v.y + this.myY,v.z + this.myZ);
    }
    
    getBoardPos() {
        return this.logic.pos;
    }

    update(deltaTime) {
        this.state.update(deltaTime);
    }
    
    die() {
        //this.visible = false;
        this.state.killPiece();
        setTimeout(3000,this.state.placeInRoster.bind(this.state,this.position));
    }
}


class PieceState {
    constructor(pieceVisual) {
        this.pieceVisual = pieceVisual;
    }

    killPiece() {}
    placeInRoster() {}

    update(deltaTime) {

    }
}

class PieceIdleState extends PieceState {
    constructor(pieceVisual) {
        super(pieceVisual);
    }

    killPiece() {
        this.pieceVisual.state = new PieceDownState(this.pieceVisual);
    }

    update(deltaTime) {

    }
}

class PieceDownState extends PieceState {
    constructor(pieceVisual) {
        super(pieceVisual);
        this.speed = 7/3000;
        console.log(this.pieceVisual);
    }

    update(deltaTime) {
        this.pieceVisual.position.y -= this.speed * deltaTime;
    }

    placeInRoster(position) {
        //this.pieceVisual.position = position;
        this.pieceVisual.state = new PieceIdleState(this.pieceVisual);
    }
}