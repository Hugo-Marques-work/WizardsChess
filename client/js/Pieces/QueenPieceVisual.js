class QueenPieceVisual extends THREE.Object3D {
    constructor(logic) {
        super();

        this.logic = logic;
    
        var geometry = new THREE.BoxGeometry(1,1,1);
        
        var matPhong = new THREE.MeshPhongMaterial({color: 0x240603});
        
        var mesh = new THREE.Mesh(geometry, matPhong);
        
        var v = this.logic.translatePosIntoVisual();
        this.position.set(v.x,v.y,v.z);

        //this.position.set(0,0.5,0);
        this.add(mesh);
    }
    
    changePos() {
        var v = this.logic.translatePosIntoVisual();
        this.position.set(v.x,v.y,v.z);
        console.log(this.position);
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