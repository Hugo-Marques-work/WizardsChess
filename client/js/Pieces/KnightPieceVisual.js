class KnightPieceVisual extends THREE.Object3D {
    constructor(logic) {
        super();

        this.logic = logic;
    }
    
    getBoardPos() {
        return this.logic.pos;
    }

    update(deltaTime) {
        //FIXME
    }
}