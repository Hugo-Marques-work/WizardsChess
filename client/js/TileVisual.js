class TileVisual extends THREE.Object3D {
    constructor(mesh, normalMaterial, highlightMaterial, boardPos) {
        super();
        this.highlightMaterial = highlightMaterial;
        this.normalMaterial = normalMaterial;

        this.mesh = mesh;
        this.add(mesh);

        this.boardPos = boardPos;
    }

    setHighlight(activate) {
        if(activate) {
            this.mesh.material = this.highlightMaterial;
        } else {
            this.mesh.material = this.normalMaterial;
        }
    }

    getBoardPos() {
        console.log(this.boardPos);
        return this.boardPos;
    }
}