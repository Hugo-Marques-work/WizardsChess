class Game {
    constructor(gameId, whiteTurnFirst, currentState) {
        this.gameId = gameId;
        this.whiteTurn = whiteTurnFirst;
        this.chessMatrix = new Board();

        this.kingW = null; this.kingB = null;
        this.queenW = []; this.queenB = [];
        this.pawnW = []; this.pawnB = [];
        this.rookW = []; this.rookB = [];
        this.knightW = []; this.kingB = [];
        this.bishopW = []; this.bishopB = [];

        this.state = currentState;
        //state ? 
    }

    //IDEA FOR IMPORTING AN EXISTING GAME FROM THE SERVER
    //fullBoardImport()
    move(origin, dest) {
        this.state.move(origin,dest);
    }

    getGameId() { return this.gameId; }

    //FIXME PROMOTE DO I CREATE THE METHOD PROMOTE OR DO WE JUST SET THE POSITIONS
    //FROM THE REQUEST
    promote(piece) {}

    getCell(pos) { return this.chessMatrix.get(pos); }

    tickTurn() {
        this.whiteTurn = !this.whiteTurn;
        this.chessMatrix.tickTurn();
    }

    fillEnPassant(lastPos, piece) {
        let white = piece.white;
        let posList = [];
        let pos = piece.pos;
        if(!white) {
            for(let p in this.pawnW) {
                if(p.pos.y == pos.y && (p.pos.x + 1 == pos.x ||
                    p.pos.x-1 == pos.x) ) {
                    
                    posList.push(p.pos);
                }
            }
        }
        else {
            for(let p in this.pawnB) {
                if(p.pos.y == pos.y && (p.pos.x + 1 == pos.x ||
                    p.pos.x-1 == pos.x) ) {
                    
                    posList.push(p.pos);
                }
            }
        }

        this.chessMatrix.setEnPassant(piece, posList, lastPos);
    }

    getEnPassantOrigin() { return this.chessMatrix.getEnPassantOrigin(); }
    getEnPassantDest() { return this.chessMatrix.getEnPassantDest(); }
    getEnPassantPiece() { return this.chessMatrix.getEnPassantPiece(); }

    getBishop(white) {
        if(white) {return this.bishopW;} else {return this.bishopB;}
    } 
    getKnight(white) {
        if(white) {return this.knightW;} else {return this.knightB;}
    }
    getRook(white) {
        if(white) {return this.rookW;} else {return this.rookB;}
    }
    getPawn(white) {
        if(white) {return this.pawnW;} else {return this.pawnB;}
    }
    getQueen(white) {
        if(white) {return this.queenW;} else {return this.queenB;}
    }
    getKing(white) {
        if(white) {return this.kingW;} else {return this.kingB;}
    }
    //setState ?

    removePawn(p) {
        if(p.white) {
            for(let i = 0; i < this.pawnW.length; i++) {
                if(this.pawnW[i].id == p.id) {
                    this.pawnW.splice(i,1);
                }
            }
        }
        else {
            for(let i = 0; i < this.pawnB.length; i++) {
                if(this.pawnB[i].id == p.id) {
                    this.pawnB.splice(i,1);
                }
            }
        }
    }
 
    insertBishop(white, p)
    {
        if(white) {this.bishopW.push(p);} else {this.bishopB.push(p);}
    } 
    insertKnight(white, p)
    {
        if(white) { this.knightW.push(p);} else { this.knightB.push(p);}
    }
    insertRook(white, p)
    {
        if(white) { this.rookW.push(p);} else { this.rookB.push(p);}
    }
    insertPawn(white, p)
    {
        if(white) { this.pawnW.push(p);} else { this.pawnB.push(p);}
    }
    insertQueen(white, p)
    {
        if(white) { this.queenW.push(p);} else { this.queenB.push(p);}
    }


    //DROP FIXME
    // drop(white) { }
    
}