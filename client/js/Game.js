class Game {
    constructor(gameId, whiteTurnFirst) {
        this.gameId = gameId;
        this.whiteTurn = whiteTurnFirst;
        this.chessMatrix = new Board();

        this.kingW = null; this.kingB = null;
        this.queenW = []; this.queenB = [];
        this.pawnW = []; this.pawnB = [];
        this.rookW = []; this.rookB = [];
        this.knightW = []; this.kingB = [];
        this.bishopW = []; this.bishopB = [];
        //state ? 
    }

    //IDEA FOR IMPORTING AN EXISTING GAME FROM THE SERVER
    //fullBoardImport()

    getGameId() { return this.gameId; }

    //FIXME PROMOTE DO I CREATE THE METHOD PROMOTE OR DO WE JUST SET THE POSITIONS
    //FROM THE REQUEST
    //promote(piece) {}

    getMatrix() { return this.chessMatrix; }

    getTurn() { return this.whiteTurn; }

    getCell(pos) { return this.chessMatrix.get(pos); }

    tickTurn() {
        this.whiteTurn = !this.whiteTurn;
        this.chessMatrix.tickTurn();
    }

    fillEnPassant(lastPos, piece) {
        //NEEDS TO BE FILLED
    }

    getEnPassantOrigin() { return this.chessMatrix.getEnPassantOrigin(); }
    getEnPassantDest() { return this.chessMatrix.getEnPassantDest(); }
    getEnPassantPiece() { return this.chessMatrix.getEnPassantPiece(); }

    //setState ?

    
}