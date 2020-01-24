class Game {
    constructor(gameId, newGame, whiteTurn, currentState) {
        this.gameId = gameId;
        if(this.whiteTurn == undefined) {

            this.whiteTurn = true;
        }
        else {
            this.whiteTurn = whiteTurn;
        }
        this.chessMatrix = new Board();

        this.kingW = null; this.kingB = null;
        this.queenW = []; this.queenB = [];
        this.pawnW = []; this.pawnB = [];
        this.rookW = []; this.rookB = [];
        this.knightW = []; this.knightB = [];
        this.bishopW = []; this.bishopB = [];

        for(var x = 0; x < BOARD_MAX_X; x++)
        {
            for(var y = 0; y < BOARD_MAX_Y; y++)
            {
                this.chessMatrix.set(new Position(x,y), null);
            }
        }

        if(currentState == undefined) {
            this.state = new PlayingState(this);
        }
        else {
            this.state = currentState;
        }
        
        if(newGame) {
            this.createBoardFromNothing();
        }

        this.meWhite= true//FIXME
    }

    //IDEA FOR IMPORTING AN EXISTING GAME FROM THE SERVER
    //fullBoardImport()
    createBoardFromNothing() {
        var forward = true;
        var firstYB = 6;
        var secondYB = 7;
        var firstYW = 1;
        var secondYW = 0;

        var posW = new Position(0, firstYW);
        var posB = new Position(0, firstYB);


        for(var x = 0; x < BOARD_MAX_X; x++) {
            posW.x = x;
            posB.x = x;

            this.pawnW.push(new PawnPiece(x*2, true, posW, this, forward));
            this.pawnB.push(new PawnPiece(x*2+1, false, posB, this, !forward));

            this.chessMatrix.set(posB, this.pawnB[this.pawnB.length - 1]);
            this.chessMatrix.set(posW, this.pawnW[this.pawnW.length - 1]);
        }

        posW.y = secondYW;
        posB.y = secondYB;
        var rookId = 0, knightId = 0, queenId = 0, bishopId = 0, kingId = 0;
        for(var x = 0; x < BOARD_MAX_X; x++) {
            posW.x = x;
            posB.x = x;
            if(x==0 || x==BOARD_MAX_X - 1) {

                this.rookW.push(new RookPiece(rookId*2, true, posW, this, forward));
                this.rookB.push(new RookPiece(rookId*2+1, false, posB, this, !forward));
    
                this.chessMatrix.set(posB, this.rookB[this.rookB.length - 1]);
                this.chessMatrix.set(posW, this.rookW[this.rookW.length - 1]);
                rookId++;
            }
            else if(x==1 || x==BOARD_MAX_X - 2) {

                this.knightW.push(new KnightPiece(knightId*2, true, posW, this, forward));
                this.knightB.push(new KnightPiece(knightId*2+1, false, posB, this, !forward));
    
                this.chessMatrix.set(posB, this.knightB[this.knightB.length - 1]);
                this.chessMatrix.set(posW, this.knightW[this.knightW.length - 1]);
                knightId++;
            }
            else if(x==2 || x==BOARD_MAX_X - 3) {

                this.bishopW.push(new BishopPiece(bishopId*2, true, posW, this, forward));
                this.bishopB.push(new BishopPiece(bishopId*2+1, false, posB, this, !forward));
    
                this.chessMatrix.set(posB, this.bishopB[this.bishopB.length - 1]);
                this.chessMatrix.set(posW, this.bishopW[this.bishopW.length - 1]);
                bishopId++;this
            }
            else if(x==3) {

                this.kingW = new KingPiece(kingId*2, true, posW, this, forward);
                this.kingB = new KingPiece(kingId*2+1, false, posB, this, !forward);

                this.chessMatrix.set(posB,this.kingB);
                this.chessMatrix.set(posW,this.kingW);
            }
            else if(x==4) {

                this.queenW.push(new QueenPiece(queenId*2, true, posW, this, forward));
                this.queenB.push(new QueenPiece(queenId*2+1, false, posB, this, !forward));
    
                this.chessMatrix.set(posB, this.queenB[this.queenB.length - 1]);
                this.chessMatrix.set(posW, this.queenW[this.queenW.length - 1]);
                queenId++;
            }
        }

    }



    checkMove(origin,dest) {
        return this.state.checkMove(origin, dest);
    }
    move(origin, dest) {
        this.state.move(origin,dest);
    }

    getGameId() { return this.gameId; }

    //FIXME PROMOTE DO I CREATE THE METHOD PROMOTE OR DO WE JUST SET THE POSITIONS
    //FROM THE REQUEST
    promote(piece) {
        
    }

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
            for(let i in this.pawnW) {
                let p = this.pawnW[i];
                if(p.pos.y == pos.y && (p.pos.x + 1 == pos.x ||
                    p.pos.x-1 == pos.x) ) {
                    
                    posList.push(p.pos);
                }
            }
        }
        else {
            for(let i in this.pawnB) {
                let p = this.pawnB[i];
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
 
    insertBishop(white, p) {
        if(white) {this.bishopW.push(p);} else {this.bishopB.push(p);}
    } 
    insertKnight(white, p) {
        if(white) { this.knightW.push(p);} else { this.knightB.push(p);}
    }
    insertRook(white, p) {
        if(white) { this.rookW.push(p);} else { this.rookB.push(p);}
    }
    insertPawn(white, p) {
        if(white) { this.pawnW.push(p);} else { this.pawnB.push(p);}
    }
    insertQueen(white, p) {
        if(white) { this.queenW.push(p);} else { this.queenB.push(p);}
    }

    /////////////////////////////////VISUAL
    translatePosIntoVisual(position) {
        return this.chessMatrix.translatePosIntoVisual(position);
    }

    getVisualPieces() {
        var visual = [];
        //MISSING VISUALS!
        for(var i in this.pawnB)
            visual.push(this.pawnB[i].visual);
        for(var i in this.pawnW)
            visual.push(this.pawnW[i].visual);

        for(var i in this.queenB)
            visual.push(this.queenB[i].visual);
        for(var i in this.queenW)
            visual.push(this.queenW[i].visual);

        for(var i in this.knightB)
            visual.push(this.knightB[i].visual);
        for(var i in this.knightW)
            visual.push(this.knightW[i].visual);

        for(var i in this.bishopB)
            visual.push(this.bishopB[i].visual);
        for(var i in this.bishopW)
            visual.push(this.bishopW[i].visual);

        for(var i in this.rookB)
            visual.push(this.rookB[i].visual);
        for(var i in this.rookW)
            visual.push(this.rookW[i].visual);
        
        visual.push(this.kingB.visual);
        visual.push(this.kingW.visual);
        
        return visual;
    }

    getBoardVisualTiles() {
        return this.chessMatrix.getBoardVisualTiles();
    }

    update(deltaTime) {
        this.chessMatrix.update();
    }
    //DROP FIXME
    // drop(white) { }
    
}