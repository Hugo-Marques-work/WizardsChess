class PlayingState extends GameState {
    constructor(game,currentPieces,moveCounter) {
        super(game);
        if(currentPieces === undefined) {
            this.currentPieces = 32;
        }
        else {
            this.currentPieces = currentPieces;
        }
        if(moveCounter === undefined) {
            this.moveCounter = 0;
        }
        else {
            this.moveCounter = 0;
        }

        this.MAX_COUNTER = 50;
    }

    accept(visitor) {
        visitor.visitPlaying(this);
    }

    move(origin, dest) {
        let m = this.game.chessMatrix;
        let p = m.get(origin);

        if(p == null) {
            throw new NoSuchPieceException();
        }
        if( p.white != this.game.whiteTurn ) {
            throw new NotYourTurnException();
        }

        this.moveCounter++;
        
        let enPassant = false;
        for(let i in this.game.getEnPassantOrigin() ) {
            var pos = this.game.getEnPassantOrigin()[i];
            if( pos.equal(origin) && dest.equal(this.game.getEnPassantDest() ) ) {
                enPassant = true;
            }
        }

        let pieceKing = this.game.getKing(p.white);

        if(enPassant) {
            let pAlt = this.game.getEnPassantPiece();
            m.set(pAlt.pos, null);
            pAlt.die();
            this.currentPieces--;
            this.moveCounter = 0;

            m.set(dest, p);
            m.set(origin, null);
            p.setPos(dest);
        }
        else if(p.validateMove(dest) == true) {
            let destP = m.get(dest);
            if(destP != null) {
                destP.die();
                this.currentPieces--;
                this.moveCounter = 0;
            }

            if(p instanceof PawnPiece) {
                this.moveCounter = 0;
            }

            m.set(dest, p);
            m.set(origin, null);

            try {
                p.setPos(dest);
            } catch( e ) {
                //PAWN PROMOTION EXCEPTION!!!
                this.game.state = new WaitingForPromotionState(this, this.game, e.pawn );
                throw e;
            }
        }

        else if(p.pos.equal(pieceKing.pos) && pieceKing.validateCastling(dest)) {
            let rook = pieceKing.getCastlingRook(dest);
            if(rook == null) throw "ErrorWithCastling";

            m.set(dest,p);
            let rookOrigin = rook.pos;
            let rookDest = new Position(dest.x+1,dest.y);

            if(p.pos.x < rookOrigin.x) {
                rookDest.x = dest.x-1;
            }

            m.set(rookDest,rook);
            m.set(rookOrigin,null);
            m.set(origin,null); 

            p.setPos(dest);
            rook.setPos(rookDest);
            console.log("King");
            console.log(p);
            console.log("Rook");
            console.log(rook);
        }
        else {
            throw new InvalidMoveException();
        }

        //FIXME
        /* 
        if( this.checkVictory() == true ) return;
        if( this.checkDraw() == true) return;
        this.checkFiftyMove();

        //validateCheck(true);
        //validateCheck(false);
        */
       
        this.game.tickTurn();
    }

    checkMove(origin, dest) {
        let m = this.game.chessMatrix;
        let p = m.get(origin);

        if(p == null) {
            throw new NoSuchPieceException();
        }

        if( p.white != this.game.whiteTurn ) {
            throw new NotYourTurnException();
        }

        this.moveCounter++;
        
        let enPassant = false;
        for(let i in this.game.getEnPassantOrigin() ) {
            var pos = this.game.getEnPassantOrigin()[i];
            if( pos.equal(origin) && dest.equal(this.game.getEnPassantDest() ) ) {
                enPassant = true;
            }
        }

        let pieceKing = this.game.getKing(p.white);

        if(enPassant) {
            return true;
        }
        else if(p.validateMove(dest) == true) {
            return true;
        }

        else if(p.pos.equal(pieceKing.pos) && pieceKing.validateCastling(dest)) {
            let rook = pieceKing.getCastlingRook(dest);
            if(rook == null) throw "ErrorWithCastling";

            return true;
        }
        else {
            throw new InvalidMoveException();
        }
    }

    //FIXME
    //WHAT DO?
    //checkVictory() { } //e etcs...
}