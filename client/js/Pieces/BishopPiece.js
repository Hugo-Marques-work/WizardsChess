class BishopPiece extends Piece {
    constructor(id,white,pos,g,forward) {
        super(id,white,pos,g,forward);
        this.visual = new BishopPieceVisual(this);

    }

    getValidMoves() {
        let valid = [];
        let tempX;
        let tempY;
        let pieceInArea = false;

        for( let x = -1; x <= 1; x+=2 ) {
            for( let y = -1; y <= 1; y+=2) {
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

        console.log(valid);
        return valid;
    }

    setPos(pos) { super.setPos(pos); this.visual.changePos(); }
    update(deltaTime) {
        this.visual.update(deltaTime);
    }
}