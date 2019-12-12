class BoardVisual extends THREE.Object3D {
    constructor() {
        super();

        this.geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
        this.material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        
        this.add(this.mesh);
    }

    update(deltaTime) {
        //FIXME
    }
}