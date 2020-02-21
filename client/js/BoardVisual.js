class BoardVisual extends THREE.Object3D {
    constructor (board) {
        super ();

        this.logic = board;
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

        this.whiteDead = [];
        this.blackDead = [];
        this.createBase();

    }

    translatePosIntoVisual(position) {
        return new THREE.Vector3(this.posSize * position.x - this.posSize * BOARD_MAX_X/2 + this.posSize/2,
            0, this.posSize * position.y - this.posSize * BOARD_MAX_X/2 + this.posSize/2);
    }

    createBase() {
        
        /*var textureLoader = new THREE.TextureLoader();
        var baseTexture = new textureLoader.load("textures/base.jpg");
        var baseBumpMap = new textureLoader.load("textures/base_bump.jpg");

        var geometry = new THREE.BoxGeometry(this.width,this.height,this.depth);
        
        var matPhong = new THREE.MeshPhongMaterial({color: 0xffffff, map: baseTexture, bumpMap:baseBumpMap});
        
        var mesh = new THREE.Mesh(geometry, matPhong);*/
        
        //this.add(mesh);
        //mesh.position.set(0,-0.6,0);

        this.tiles = [];
        this.orderedTiles = [];
        for(var i = 0; i < 8; i++) {
            this.orderedTiles[i] = [];
        }
        this.addWhitePos();
        this.addBlackPos();

        console.log(this.tiles);
    }

    addWhitePos() {
        var textureLoader = new THREE.TextureLoader();
        var whiteTexture = new textureLoader.load("textures/white.jpg");
        var whiteBumpMap = new textureLoader.load("textures/white_bump.jpg");
        var geometry = new THREE.BoxGeometry(this.posSize, this.posHeight, this.posSize);
        var matNormal = new THREE.MeshPhongMaterial({color: 0xffffff, map: whiteTexture, bumpMap:whiteBumpMap, specular:0x305284, shininess: 1});
        var matHighlight = new THREE.MeshPhongMaterial({color: 0xff00ff, map: whiteTexture, bumpMap:whiteBumpMap, specular:0x305284, shininess: 1});
        var matMovable = new THREE.MeshPhongMaterial({color: 0xfff000, specular:0x305284, shininess: 1});
        var matKillable = new THREE.MeshPhongMaterial({color: 0xff0000, specular:0x305284, shininess: 1}); 
        var pos = new THREE.Mesh(geometry, matNormal);

        for(var x = 0; x<16; x+=4) {
            for(var y = 0; y<16; y+=4) {

                var tile1Pos = new Position(x/2, y/2);
                var tile1 = new TileVisual(pos.clone(), matNormal, matMovable, matKillable, matHighlight, tile1Pos, this.logic, this.posSize);

                this.tiles.push(tile1);
                this.orderedTiles[tile1Pos.x][tile1Pos.y] = tile1;
                this.add(tile1);
                tile1.position.set(-this.width/2 + x + 2, -0.5, -this.depth/2 + y + 2);
                
                var tile2Pos = new Position(x/2 + 1, y/2 + 1);
                var tile2 = new TileVisual(pos.clone(), matNormal, matMovable, matKillable, matHighlight, tile2Pos, this.logic, this.posSize);

                this.tiles.push(tile2);
                this.orderedTiles[tile2Pos.x][tile2Pos.y] = tile2;
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
        var geometry = new THREE.BoxGeometry(this.posSize, this.posHeight, this.posSize);
        var matNormal = new THREE.MeshPhongMaterial({color:  0xffffff, map: blackTexture, bumpMap:blackBumpMap, specular:0xffffff, shininess: 1});
        var matHighlight = new THREE.MeshPhongMaterial({color:  0xff00ff, map: blackTexture, bumpMap:blackBumpMap, specular:0xffffff, shininess: 1});
        var matMovable = new THREE.MeshPhongMaterial({color: 0xfff000, specular:0x305284, shininess: 1});
        var matKillable = new THREE.MeshPhongMaterial({color: 0xff0000, specular:0x305284, shininess: 1}); 
        var pos = new THREE.Mesh(geometry, matNormal);

        for(var x = 0; x<16; x+=4) {
            for(var y = 0; y<16; y+=4) {

                var tile1Pos = new Position(x/2, y/2 + 1);
                var tile1 = new TileVisual(pos.clone(), matNormal, matMovable, matKillable, matHighlight, tile1Pos, this.logic, this.posSize);

                this.tiles.push(tile1);
                this.orderedTiles[tile1Pos.x][tile1Pos.y] = tile1;
                this.add(tile1);
                tile1.position.set(-this.width/2 + x + 2, -0.5, -this.depth/2 + y + 4);

                var tile2Pos = new Position(x/2 + 1, y/2);
                var tile2 = new TileVisual(pos.clone(), matNormal, matMovable, matKillable, matHighlight, tile2Pos, this.logic, this.posSize);

                this.tiles.push(tile2);
                this.orderedTiles[tile2Pos.x][tile2Pos.y] = tile2;
                this.add(tile2);
                tile2.position.set(-this.width/2 + x + 4, -0.5, -this.depth/2 + y + 2);
                
            }  
        }
    }

    getTiles() {
        return this.tiles;
    }

    getTile(pos) {
        return this.orderedTiles[pos.x][pos.y];
    }

    update(deltaTime) {
        for(var i in this.tiles) {
            this.tiles[i].update(deltaTime);
        }
        //FIXME
    }

    pushDead(piece) {
        var k = 0;
        var newDeadPos;
        if(piece.white) {
            this.whiteDead.push(piece);
            k = this.whiteDead.length;
            newDeadPos = new Position(k, BOARD_MAX_Y + 1);
    
        } 
        else {
            this.blackDead.push(piece);
            k = this.blackDead.length;
            newDeadPos = new Position(k, -1);
        }
        return newDeadPos;
    }
}