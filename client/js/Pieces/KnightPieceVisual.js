class KnightPieceVisual extends PieceVisual {
    constructor(logic) {
        super(logic);
	this.myY=0;
    }

    makeVisual() {
        var that = this;
        var white = this.logic.white;
        this.killableMaterial = new THREE.MeshPhongMaterial({color: this.killableColor, opacity: 1, transparent: true});
        if(this.logic.white) {
            this.highlightMaterial = new THREE.MeshPhongMaterial({color: this.whiteColor, opacity:0.5, transparent: true});
            this.normalMaterial = new THREE.MeshPhongMaterial({color: this.whiteColor, opacity:1,  transparent: true});
        } else {
            this.highlightMaterial = new THREE.MeshPhongMaterial({color: this.blackColor, opacity:0.5, transparent: true});
            this.normalMaterial = new THREE.MeshPhongMaterial({color: this.blackColor, opacity:1,  transparent: true});
        }

        var child = knightPieceBlender.clone();
        var scale = new THREE.Vector3(0.7,0.8,0.7);
        var centerOffset = 2;
         that.addUserDataVisual(child);
         child.position.set(0, centerOffset, 0);
         if(white)
         child.rotation.set(0,-Math.PI/2,0);
         else 
         child.rotation.set(0,Math.PI/2,0);
         child.scale.set(scale.x, scale.y, scale.z);
         child.castShadow = true;
         child.userData.visual = that;
         that.mesh = child;
         that.add(child);

         that.setHighlight(false);

        /*
        var geometry = new THREE.BoxGeometry(0.5,0.5,1);
        
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

    setKillable() {
        this.changeMat(this.mesh,this.killableMaterial);
    }

    setHighlight(activate) {
        if(activate) {
            this.changeMat(this.mesh,this.highlightMaterial);  
        } else {
            this.changeMat(this.mesh,this.normalMaterial); 
        }
    }

    changeMat(child,material) {

        child.material = material;  
        for( var i in child.children ) 
        {
           //if(child[i] instanceof THREE.Object3D)     
                this.changeMat(child.children[i],material);            
        }
    }
    
    addUserDataVisual(child) {
        child.userData.visual = this;    
        for( var i in child.children ) 
        {
           //if(child[i] instanceof THREE.Object3D)     
                this.addUserDataVisual(child.children[i]);            
        }
    }
}
