class KingPiece extends Piece {
    constructor(id,white,pos,g,forward) {
        if(pos!=undefined) {
            var actualPos = pos.clone();
            super(id,white,actualPos,g,forward);
        }
        else {
            super(id,white,pos,g,forward);
        }
        this.visual = new KingPieceVisual(this);

        this.hasMoved = false;
    }

    getValidMoves() {
        let valid = [];

        for( let x = -1; x <= 1; x++ ) {
            for( let y = -1; y <= 1; y++) {
                if(x == 0 && y == 0) continue;
                try {
                    pieceInArea = this.pushIfAvailable(valid, new Position(
                        this.pos.x + x, this.pos.y + y), undefined);
                
                } catch( err ) { continue; }
            }
        }

        console.log("Kin"); 
        return valid;
    }

    getValidCastling() {
        if(this.hasMoved) return [];

        let valid = [];
        var rooks = this.game.getRook(this.white);

        for(let i in rooks) {
            var rook = rooks[i];
            if(rook.hasMoved) continue;

            let rPos = rook.pos;
            let dx = this.pos.x - rPos.x < 0 ? 1 : -1;
            let x = this.pos.x + dx;
            let y = this.pos.y;

            while(x!=rPos.x) {
                if(this.game.getCell( new Position(x,y) ) != null ) {
                    break;
                }

                x+=dx;
            }

            if(x==rPos.x) {
                valid.push( new Position(this.pos.x + dx*2, y));
            }
        }

        return valid;
    }

    validateCastling(dest) {
        var rooks = this.getValidCastling();
        for(let i in rooks ) {
            let pos = rooks[i];
            if(pos.x == dest.x && pos.y == dest.y) {
                return true;
            }
        }
        return false;
    }

    getCastlingRook(dest) {
        if(this.validateCastling(dest)==false) return null;
    
        console.log(dest);
        console.log(this.pos);
        if(dest.x == this.pos.x + 2) {
            return this.game.getCell( new Position(BOARD_MAX_X-1, this.pos.y));
        }
        else {
            return this.game.getCell( new Position(0, this.pos.y));
        }
    }

    setPos(pos) {
        super.setPos(pos);
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