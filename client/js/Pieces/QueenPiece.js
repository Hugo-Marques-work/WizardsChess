class QueenPiece extends Piece {
    constructor(id,white,pos,g,forward) {
        if(pos!=undefined) {
            var actualPos = pos.clone();
            super(id,white,actualPos,g,forward);
        }
        else {
            super(id,white,pos,g,forward);
        }
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
                pieceInArea = false;
                tempX = x;
                tempY = y;

                while(pieceInArea == false) {
                    try {
                        pieceInArea = this.pushIfAvailable(valid, new Position(
                            this.pos.x + tempX, this.pos.y + tempY), undefined);
                    
                        tempX+=x;
                        tempY+=y;
                    } catch( err ) { break; }
                } 
            }
        }
        console.log("Quee");

        return valid;
    }

    update(deltaTime) {
        this.visual.update(deltaTime);
    }


    setPos(pos) {
        super.setPos(pos);
    }
    
    die() {
        super.die();
        this.visual.die();
    }
}