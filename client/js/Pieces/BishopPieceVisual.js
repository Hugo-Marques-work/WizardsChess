class BishopPieceVisual extends PieceVisual {
    constructor(logic) {
        super(logic);
    }

    makeVisual() {
        var loader = new THREE.GLTFLoader();
        var that = this;
        this.killableMaterial = new THREE.MeshPhongMaterial({color: this.killableColor, opacity: 1, transparent: true});
        if(this.logic.white) {
            this.highlightMaterial = new THREE.MeshPhongMaterial({color: this.whiteColor, opacity:0.5, transparent: true});
            this.normalMaterial = new THREE.MeshPhongMaterial({color: this.whiteColor, opacity:1,  transparent: true});
        } else {
            this.highlightMaterial = new THREE.MeshPhongMaterial({color: this.blackColor, opacity:0.5, transparent: true});
            this.normalMaterial = new THREE.MeshPhongMaterial({color: this.blackColor, opacity:1,  transparent: true});
        }

        loader.load(
            "/../../pieces/bishop.glb",
            function ( gltf ) {
             
                 var scale = new THREE.Vector3(0.8,0.08,0.8);
                 var centerOffset = 0.5;
                 var child = gltf.scene.children[0];
                 child.position.set(0, centerOffset, 0);
                 child.scale.set(scale.x, scale.y, scale.z);
                 child.castShadow = true;
                 child.material = that.normalMaterial;
                 child.userData.visual = that;
                 that.mesh = child;
                 that.add(child);
                 
            },
         );
/*
        var geometry = new THREE.BoxGeometry(1,0.5,0.5);
        
        if(this.logic.white) {
            this.highlightMaterial = new THREE.MeshPhongMaterial({color:0xffffff, opacity:0.5, transparent: true});
            this.normalMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, opacity:1,  transparent: true});
        } else {
            this.highlightMaterial = new THREE.MeshPhongMaterial({color:0x000000, opacity:0.5, transparent: true});
            this.normalMaterial = new THREE.MeshPhongMaterial({color: 0x000000, opacity:1,  transparent: true});
        }
        
        this.mesh = new THREE.Mesh(geometry, this.normalMaterial);

        this.add(this.mesh);*/
    }
}