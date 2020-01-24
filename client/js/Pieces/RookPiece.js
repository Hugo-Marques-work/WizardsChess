class RookPiece extends Piece {
    constructor(id,white,pos,g,forward) {
        if(pos!=undefined) {
            var actualPos = pos.clone();
            super(id,white,actualPos,g,forward);
        }
        else {
            super(id,white,pos,g,forward);
        }
        this.visual = new RookPieceVisual(this);

        this.hasMoved = false;
    }

    getValidMoves() {
        let valid = [];
        let tempX;
        let tempY;
        let pieceInArea = false;

        for( let x = -1; x <= 1; x+=2 ) {
            tempX = x;
            pieceInArea = false;

            while(pieceInArea == false) {
                try {
                    pieceInArea = this.pushIfAvailable(valid, new Position(
                        this.pos.x + tempX, this.pos.y), undefined);
                    
                    tempX+=x;
                } catch( err ) { break; }
            } 
        }

        for( let y = -1; y <= 1; y+=2 ) {
            tempY = y;
            pieceInArea = false;

            while(pieceInArea == false) {
                try {
                    pieceInArea = this.pushIfAvailable(valid, new Position(
                        this.pos.x, this.pos.y + tempY), undefined);
                    
                    tempY+=y;
                } catch( err ) { break; }
            } 
        }
        console.log("Rook");

        return valid;
    }

    setPos(pos) {
        super.setPos(pos);
        this.visual.changePos();
        this.hasMoved = true;
    }

    hasMoved() { return this.hasMoved; }

    update(deltaTime) {
        this.visual.update(deltaTime);
    }
    
    die() {
        super.die();
        this.visual.die();
    }
}