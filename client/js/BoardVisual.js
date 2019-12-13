class BoardVisual extends THREE.Object3D {
    constructor () {
        super ();

        this.globalIntensity = 0.6;
        this.directionalLight = new THREE.DirectionalLight(0xffffff,this.globalIntensity);
        this.directionalLight.position.set(0,50,50);
        this.directionalLight.target.position.set(0,0,0);
        this.add(this.directionalLight);
        
        this.pointIntensity = 1;

        this.pointlight = new THREE.PointLight( 0xffffff,this.pointIntensity,100,10);
        this.pointlight.position.set(10,5,0);

        this.pointlight.castShadow = true;
        this.add(this.pointlight);

        this.width = 18;
        this.height = 1;
        this.depth = 18;
        this.posSize = 2;
        this.posHeight = 1;

        this.createBase();

    }

    translatePosIntoVisual(position) {
        return new THREE.Vector3(this.posSize * position.x - this.posSize * BOARD_MAX_X/2,
            this.posHeight/2, this.posSize * position.y - this.posSize * BOARD_MAX_X/2)
    }
    createBase() {
        
        var textureLoader = new THREE.TextureLoader();
        var baseTexture = new textureLoader.load("textures/base.jpg");
        var baseBumpMap = new textureLoader.load("textures/base_bump.jpg");

        var geometry = new THREE.BoxGeometry(this.width,this.height,this.depth);
        
        var matPhong = new THREE.MeshPhongMaterial({color: 0xffffff, map: baseTexture, bumpMap:baseBumpMap});
        
        var mesh = new THREE.Mesh(geometry, matPhong);
        
        this.add(mesh);
        mesh.position.set(0,-0.6,0);

        this.tiles = [];
        this.addWhitePos();
        this.addBlackPos();
    }

    addWhitePos() {
        var textureLoader = new THREE.TextureLoader();
        var whiteTexture = new textureLoader.load("textures/white.jpg");
        var whiteBumpMap = new textureLoader.load("textures/white_bump.jpg");

        for(var x = 0; x<16; x+=4) {
            for(var y = 0; y<16; y+=4) {
                
                var geometry = new THREE.BoxGeometry(this.posSize, this.posHeight, this.posSize);
                var matPhong = new THREE.MeshPhongMaterial({color: 0xffffff, map: whiteTexture, bumpMap:whiteBumpMap, specular:0x305284, shininess: 1});

                var pos1 = new THREE.Mesh(geometry, matPhong);
                var tile1 = new TileVisual(pos1, new Position(x/2, y/2));

                this.tiles.push(tile1);
                this.add(tile1);
                tile1.position.set(-this.width/2 + x + 2, -0.5, -this.depth/2 + y + 2);
                
                var pos2 = new THREE.Mesh(geometry, matPhong);
                var tile2 = new TileVisual(pos2, new Position(x/2 + 1, y/2 + 1));

                this.tiles.push(tile2);
                this.add(tile2);
                tile2.position.set(-this.width/2 + x + 4, -0.5, -this.depth/2 + y + 4);
            }  
        }
    }

    addBlackPos() {
        this.pos = [];
        var textureLoader = new THREE.TextureLoader();
        var blackTexture = new textureLoader.load("textures/black.jpg");
        var blackBumpMap = new textureLoader.load("textures/black_bump.jpg");

        for(var x = 0; x<16; x+=4) {
            for(var y = 0; y<16; y+=4) {
                var geometry = new THREE.BoxGeometry(this.posSize, this.posHeight, this.posSize);
                var matPhong = new THREE.MeshPhongMaterial({color:  0xffffff, map: blackTexture, bumpMap:blackBumpMap, specular:0xffffff, shininess: 1});

                var pos1 = new THREE.Mesh(geometry, matPhong);
                var tile1 = new TileVisual(pos1, new Position(x/2, y/2 + 1));

                this.tiles.push(tile1);
                this.add(tile1);
                tile1.position.set(-this.width/2 + x + 2, -0.5, -this.depth/2 + y + 4);

                var pos2 = new THREE.Mesh(geometry, matPhong);
                var tile2 = new TileVisual(pos2, new Position(x/2 + 1, y/2));

                this.tiles.push(tile2);
                this.add(tile2);
                tile2.position.set(-this.width/2 + x + 4, -0.5, -this.depth/2 + y + 2);
                
            }  
        }
    }

    getTiles() {
        return this.tiles;
    }
    update(deltaTime) {
        //FIXME
    }
}