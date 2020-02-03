class QueenPieceVisual extends PieceVisual {
    constructor(logic) {
        super(logic);
    }

    makeVisual() {

        var geometry = new THREE.BoxGeometry(1,0.2,1);
        
        if(this.logic.white) {
            this.highlightMaterial = new THREE.MeshPhongMaterial({color:0xffffff, opacity:0.5, transparent: true});
            this.normalMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, opacity:1,  transparent: true});
        } else {
            this.highlightMaterial = new THREE.MeshPhongMaterial({color:0x000000, opacity:0.5, transparent: true});
            this.normalMaterial = new THREE.MeshPhongMaterial({color: 0x000000, opacity:1,  transparent: true});
        }
        
        this.mesh = new THREE.Mesh(geometry, this.normalMaterial);

        this.add(this.mesh);
    }
}