class PieceVisual extends THREE.Object3D {
    constructor(logic) {
        super();
        this.myX = 0;
        this.myY = 0;
        this.myZ = 0;
        this.whiteColor = 0xf0eedd;
        this.blackColor = 0x383733;

        this.logic = logic;

        this.mesh;
        //this.makeVisual();

        var v = this.logic.translatePosIntoVisual();
        this.position.set(v.x,v.y,v.z);
    }

    makeVisual() {
        //virtual
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
        //FIXME
    }
    
    die() {
        this.visible = false;
    }
}