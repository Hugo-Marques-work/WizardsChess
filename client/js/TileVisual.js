class TileVisual extends THREE.Object3D {
    constructor(mesh,boardPos) {
        super();
        this.add(mesh);
        this.boardPos = boardPos;
        var boardPos;
    }

    getBoardPos() {
        return this.boardPos;
    }
}