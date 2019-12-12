class QueenPiece extends Piece {
    constructor(id,white,pos,g,forward) {
        super(id,white,pos,g,forward);
        this.visual = new QueenPieceVisual(this);

    }

    getValidMoves() {
        let valid = [];
        let tempX;
        let tempY;
        let pieceInArea = false;

        for( let x = -1; x <= 1; x++ ) {
            for( let y = -1; y <= 1; y++) {
                if(x == 0 && y == 0) continue;
                
                tempX = x;
                tempY = y;

                while(pieceInArea == false) {
                    try {
                        pieceInArea = this.pushIfAvailable(valid, new Position(
                            this.pos.x + tempX, this.pos.y + tempY), undefined);
                    
                    } catch( err ) { break; }
                } 
            }
        }

        return valid;
    }

    update(deltaTime) {
        this.visual.update(deltaTime);
    }
}