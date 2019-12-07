//ABSTRACT CLASS!!!
class GameState {
    constructor(game) {
        this.game = game;
    }

    accept(visitor) {

    }
    move(origin, dest) {
        
    }
    promote(piece) {
        throw new InvalidActionException();
    }
}