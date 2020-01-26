class PieceVisual extends THREE.Object3D {
    constructor(logic) {
        super();

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
        this.position.set(v.x,v.y,v.z);
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