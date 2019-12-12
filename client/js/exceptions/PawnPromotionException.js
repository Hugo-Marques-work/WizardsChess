class PawnPromotionException extends Error {
    constructor(piece) {
        super("Pawn Promotion Exception");
        this.pawn = piece;
    }
}