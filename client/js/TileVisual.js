class TileVisual extends THREE.Object3D {
    constructor(mesh, normalMaterial, movableMaterial, matKillable, highlightMaterial, boardPos, board, length) {
        super();
        this.highlightMaterial = highlightMaterial;
        this.movableMaterial = movableMaterial;
        this.normalMaterial = normalMaterial;
        this.killableMaterial = matKillable;

        this.mesh = mesh;
        //this.add(mesh);

        this.boardPos = boardPos;
        this.board = board;


        this.axisPoint = new THREE.Group();
        this.axisPoint.position.set(this.mesh.position.x - length/2, 
            this.mesh.position.y, this.mesh.position.z);
        
        this.mesh.position.x += length/2;

        
        this.mesh.userData.visual = this;   
        this.axisPoint.userData.visual = this;   

        this.axisPoint.add(this.mesh);

        this.add(this.axisPoint);
        this.state = new TileNormal(this, this.axisPoint);
    }

    setMovable(white) {
        var piece = this.board.get(this.boardPos);
        if(piece != null && piece.white != white) {
            this.mesh.material = this.killableMaterial;
            piece.visual.setKillable();
        }
        else {
            this.mesh.material = this.movableMaterial;
        }
    }
    
    setHighlight(activate) {
        if(activate) {
            this.mesh.material = this.highlightMaterial;
        } else {
            this.mesh.material = this.normalMaterial;
        
            //FIXME
            var piece = this.board.get(this.boardPos);
            if(piece!=null)
                piece.visual.setHighlight(activate);
        }
    }

    killPiece() {
        this.state.killPiece();
    }

    getBoardPos() {
        console.log(this.boardPos);
        return this.boardPos;
    }

    update(deltaTime) {
        this.state.update(deltaTime);
    }
}

class TileState {
    constructor(tile, axisPoint) {
        this.tile = tile;
        this.axisPoint = axisPoint;
    }

    killPiece() {
        this.tile.state = new TileDown(this.tile,this.axisPoint);

    }
    update(deltaTime) {

    }
}

class TileNormal extends TileState {
    constructor(tile, axisPoint) {
        super(tile, axisPoint);
    }

    killPiece() {
        this.tile.state = new TileDown(this.tile,this.axisPoint);
        var piece = this.tile.board.get(this.tile.boardPos);
        if(piece!=null) {
            piece.die();
        }
    }
    update(deltaTime) {

    }
}

class TileDown extends TileState {
    constructor(tile, axisPoint) {
        super(tile, axisPoint);
        this.angle = Math.PI/3000;
        this.currentAngle = 0;
    }

    update(deltaTime) {
        this.currentAngle += this.angle * deltaTime;
        this.axisPoint.rotation.z -= this.angle * deltaTime;
        if(this.currentAngle>Math.PI/2) {
            this.axisPoint.rotation.z += this.currentAngle - Math.PI/2;
            this.tile.state = new TileOpen(this.tile,this.axisPoint);
        }

    }

}

class TileOpen extends TileState {
    constructor(tile, axisPoint) {
        super(tile, axisPoint);
        
        setTimeout(this.openDone.bind(this), 5000);
    }

    openDone() {
        this.tile.state = new TileUp(this.tile, this.axisPoint);
    }

    update(deltaTime) {

    }


}

class TileUp extends TileState {
    constructor(tile, axisPoint) {
        super(tile, axisPoint);
        this.angle = Math.PI/3000;
        this.currentAngle = 0;
    }

    update(deltaTime) {
        this.currentAngle += this.angle * deltaTime;
        this.axisPoint.rotation.z += this.angle * deltaTime;
        if(this.currentAngle>Math.PI/2) {
            this.axisPoint.rotation.z += -this.currentAngle + Math.PI/2;
            this.tile.state = new TileNormal(this.tile,this.axisPoint);
        }
    }

}