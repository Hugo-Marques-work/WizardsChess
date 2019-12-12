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
        if( p.white != this.game.getTurn() ) {
            throw new NotYourTurnException();
        }

        this.moveCounter++;
        
        let enPassant = false;
        for(let pos in this.game.getEnPassantOrigin() ) {
            if( pos == origin && dest == this.game.getEnPassantDest() ) {
                enPassant = true;
            }
        }

        let pieceKing = this.game.getKing(p.white);

        if(enPassant) {
            pAlt = this.game.getEnPassantPiece();
            m.set(pAlt.pos, null);
            pAlt.die();
            this.currentPieces--;
            this.moveCounter = 0;

            m.set(dest, p);
            m.set(origin, null);
            p.setPos(dest);
        }
        else if(p.validateMove(dest) == true) {
            destP = m.get(dest);
            if(destP == null) {
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
                this.game.state = new WaitingForPromotionState(this, _game, e.pawn );
                throw e;
            }
        }

        else if(p.pos.equal(pieceKing.pos) && pieceKing.validateCastling(dest)) {
            rook = pieceKing.getCastlingRook(dest);
            if(rook == null) throw "ErrorWithCastling";

            m.set(dest,p);
            rookOrigin = rook.pos;
            rookDest = new Position(dest.x+1,dest.y);

            if(p.getPos().x < rookOrigin.x) {
                rookDest.x = dest.x-1;
            }

            p.setPos(dest);
            rook.setPos(rookDest);
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
        if( p.white != this.game.getTurn() ) {
            throw new NotYourTurnException();
        }

        this.moveCounter++;
        
        let enPassant = false;
        for(let pos in this.game.getEnPassantOrigin() ) {
            if( pos == origin && dest == this.game.getEnPassantDest() ) {
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
            rook = pieceKing.getCastlingRook(dest);
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