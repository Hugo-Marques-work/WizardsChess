class TileVisual extends THREE.Object3D {
    constructor(mesh, normalMaterial, movableMaterial, highlightMaterial, boardPos) {
        super();
        this.highlightMaterial = highlightMaterial;
        this.movableMaterial = movableMaterial;
        this.normalMaterial = normalMaterial;

        this.mesh = mesh;
        this.add(mesh);

        this.boardPos = boardPos;
    }

    setMovable() {
        this.mesh.material = this.movableMaterial;
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