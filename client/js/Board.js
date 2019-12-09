var BOARD_MAX_X = 8;
var BOARD_MAX_Y = 8;

class Board {
    constructor() {
        this.visual = new BoardVisual();
        
        this.pieces = [];
        for(let i = 0; i < BOARD_MAX_Y; i++)
        {
            this.pieces.push([]);
            for(let j = 0; j < BOARD_MAX_X; j++)
            {
                this.pieces[0].push(null);
            }
        }

        this.enPassantOrigin = [];
        this.enPassantDest = null;
        this.enPassantPiece = null;
        this.enPassantLiveTime = 0;
    }

    get(pos) {
        return this.pieces[pos.x][pos.y];
    }

    set(pos,piece) {
        this.pieces[pos.x][pos.y] = piece;
    }

    clearEnPassant() {
        this.enPassantOrigin = [];
        this.enPassantDest = null;
        this.enPassantPiece = null;
    }

    setEnPassant(piece, origin, dest) {
        this.clearEnPassant();
        this.enPassantPiece = piece;
        this.enPassantOrigin = origin;
        this.enPassantDest = dest;
        this.enPassantLiveTime = 2;
    }

    tickTurn() {
        this.enPassantLiveTime--;
        if(this.enPassantLiveTime<0)
            this.clearEnPassant();
    }

    getEnPassantPiece() {
        return this.enPassantPiece;
    }
    getEnPassantOrigin() {
        return this.enPassantOrigin;
    }
    getEnPassantDest() {
        return this.enPassantDest;
    }

    update(deltaTime) {
        //FIXME
        for(let i = 0; i < BOARD_MAX_Y; i++)
        {
            for(let k = 0; k < BOARD_MAX_X; k++)
            {
                if(this.pieces[i][k]!=null)
                    this.pieces[i][k].update(deltaTime);
            }
        }
    }
}