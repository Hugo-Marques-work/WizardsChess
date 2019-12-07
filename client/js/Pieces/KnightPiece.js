class KnightPiece extends Piece {
    constructor(id,white,pos,g,forward) {
        super(id,white,pos,g,forward);
        this.visual = new KnightPieceVisual();

    }

    getValidMoves() {
        let valid = [];
        let minY = 0;
        let pieceInArea = false;

        for( let x = -2; x <= 2; x++ ) {
            
            if(x==0) continue;
            if(x == -2  || x == 2) minY = -1;
            else if(x == -1 || x == 1) minY = -2;

            for( let y = minY; y <= 2; y+=2) {
                
                if(y==0) continue;

                try {
                    this.pushIfAvailable(valid, new Position(
                        this.pos.x + x, this.pos.y + y), undefined);
                
                } catch( err ) { continue; }
            }
        }

        return valid;
    }
}