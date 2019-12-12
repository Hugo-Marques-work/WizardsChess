class WaitingForPromotionState extends GameState {
    constructor(playingState, game, pawn) {
        this.game = game;
        this.playingState = playingState;
        this.pawn = pawn;
    }

    accept(visitor) {
        visitor.visitWaiting(this);
    }
    move(origin, dest) {
        throw new InvalidActionException();
    }
    promote(piece) {
        piece.set(this.pawn.id,this.pawn.white,this.pawn.pos,
            this.game, this.pawn.forward);
        
        this.game.setState(this.playingState);
        this.game.tickTurn();
        this.game.chessMatrix.set(piece.pos,piece);
    }
    
    checkMove(origin, dest) {
        throw new InvalidActionException();
    }
}