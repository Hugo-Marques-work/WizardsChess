class RookPiece extends Piece {
    constructor(id,white,pos,g,forward) {
        super(id,white,pos,g,forward);
        this.visual = new RookPieceVisual();

        this.hasMoved = false;
    }

    getValidMoves() {
        let valid = [];
        let tempX;
        let tempY;
        let pieceInArea = false;

        for( let x = -1; x <= 1; x+=2 ) {
            tempX = x;

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

            while(pieceInArea == false) {
                try {
                    pieceInArea = this.pushIfAvailable(valid, new Position(
                        this.pos.x, this.pos.y + tempY), undefined);
                    
                    tempY+=y;
                } catch( err ) { break; }
            } 
        }

        return valid;
    }

    setPos(pos) {
        super.setPos(pos);
        this.hasMoved = true;
    }

    hasMoved() { return this.hasMoved; }
}