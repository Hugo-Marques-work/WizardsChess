class PieceVisual extends THREE.Object3D {
    constructor(logic) {
        super();
        this.myX = 0;
        this.myY = -0.3;
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
    
    changePos(animation) {
        var v = this.logic.translatePosIntoVisual();
        if(animation) {
            var newPos = new THREE.Vector3(v.x + this.myX,v.y + this.myY,v.z + this.myZ);
            this.state = new PieceHopState(this, newPos);
        }
        else {
            this.position.set(v.x + this.myX,v.y + this.myY,v.z + this.myZ);
        }
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
        //setTimeout(3000,this.state.placeInRoster.bind(this.state,this.position));
    }

    placeInRoster() {
        this.state = new PieceIdleState();
    }
}


class PieceState {
    constructor(pieceVisual) {
        this.pieceVisual = pieceVisual;
    }

    killPiece() {}

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
    }

    update(deltaTime) {
        this.pieceVisual.position.y -= this.speed * deltaTime;
    }
}

class PieceHopState extends PieceState {
    constructor(pieceVisual, to) {
        super(pieceVisual);
        this.to = to;
        this.missing = new THREE.Vector3( Math.abs(this.to.x-this.pieceVisual.position.x), 
            0, Math.abs( this.to.z - this.pieceVisual.position.z ) );

        this.maxHeight = 4;
        this.timePassed = 0;
        this.speed = new THREE.Vector3(
                1/3000 * (this.to.x - this.pieceVisual.position.x ), 
                0, 
                1/3000 * (this.to.z - this.pieceVisual.position.z ) );
        console.log(this.pieceVisual);
    }

    update(deltaTime) {
        var x = false;
        var z = false;
        if(this.missing.z <= 0)
            z = true;
        else {
            this.pieceVisual.position.z += this.speed.z * deltaTime;
            this.missing.z -= Math.abs(this.speed.z * deltaTime);
        }

        if(this.missing.x <= 0)
            x = true;
        else {
            this.pieceVisual.position.x += this.speed.x * deltaTime;
            this.missing.x -= Math.abs(this.speed.x * deltaTime);
        }

        this.pieceVisual.position.y = 
            Math.sin( ( (Math.PI/2)/1500) * (deltaTime + this.timePassed) ) * this.maxHeight;


        if( x && z ) {
            this.pieceVisual.position.set(this.to.x, this.to.y, this.to.z);
            this.pieceVisual.state = new PieceIdleState(this.pieceVisual);
        }
        
        this.timePassed += deltaTime;
        //this.pieceVisual.position.y -= this.speed * deltaTime;
    }
}
