// WrongInputException.js
class WrongInputException extends Error {
    constructor (str) {
        super("Wrong Input Exception: " + str);
    }
}

// LexerEofException.js
class LexerEofException extends Error {
    constructor() {
        super("Lexer Eof Exception");
    }
}

// LexerConversionException.js
class LexerConversionException extends Error {
    constructor() {
        super("Lexer Conversion Exception");
    }
}

// ErrorAnswerException.js
class ErrorAnswerException extends Error {
    constructor (errId) {
        super("Answer is error " + errId);
        this.errId = errId;
    }
}

//Lexer.js
class Lexer {
    constructor (string) {
        this.string = string;
        this.index = 0;
    }
    
    readString () {
        var begin, length = this.string.length;
        
        this.skipSpaces();
        
        if (this.index == length) 
            throw new LexerEofException ();
        
        begin = this.index;
        
        while (this.index < length && this.string[this.index] != ' ')
            this.index ++;
        
        return this.string.substr(begin, this.index - begin);
    }
    
    readInteger () {
        var number = Number (this.readString());
        
        if (isNaN(number) || !Number.isInteger(number))
            throw new LexerConversionException ();
        
        else
            return number;
    }
    
    skipSpaces () {
        var length = this.string.length;
        
        while (this.index < length && this.string[this.index] == ' ')
            this.index ++;
    }
}

// Answer.js
class Answer {

}

class RegAnswer extends Answer {
    constructor () {
        super();
    }
}

class LoginAnswer extends Answer {
    constructor () {
        super();
    }
}

class GameInfo {
    constructor (gameId, otherUser, isWhite, isWhiteTurn, turnCount) {
        this.gameId = gameId;
        this.otherUser = otherUser;
        this.isWhite = isWhite;
        this.isWhiteTurn = isWhiteTurn;
        this.turnCount = turnCount;
    }
}

class ListGamesAnswer extends Answer {
    constructor (listGameInfo) {
        super();
        this.listGameInfo = listGameInfo;
    }
}

class GameStatusAnswer extends Answer {
    constructor (status, extras) {
        super();
        this.status = status;
        this.extras = extras;
    }
}

class GameTurnAnswer extends Answer {
    constructor (turn) {
        super();
        this.turn = turn;
        this.white = turn === "W";
    }
}

class GameMoveAnswer extends Answer {
    constructor (info, winner) {
        super();
        this.info = info;
        this.winner = winner;
    }
}

class GameLastMoveAnswer extends Answer {
    constructor (x1, y1, x2, y2) {
        super();

        this.from = new Position(x1,y1);
        this.to = new Position(x2,y2);
    }
}

class DropAnswer extends Answer {
    constructor () {
        super();
    }
}

class PawnPromotionAnswer extends Answer {
    constructor () {
        super();
    }
}

class NewGameAnswer extends Answer {
    constructor () {
        super();
    }
}

class ImportGameAnswer extends Answer {
    constructor (imWhite, otherUser, importedGame) {
        super();
        this.otherUser = otherUser;
        this.imWhite = imWhite;
        this.importedGame = importedGame;
    }
}
// AnswerParser.js
class AnswerParser {
    checkError (lexer) {
        var ans, errId, errExtra;
        
        try {
            ans = lexer.readString();
        } catch (e) {
            throw new WrongInputException ("Reading OK/ERR: " + e.message);
        }
        
        if (ans == "ERR") {
            try {
                var errId = lexer.readString();
            } catch (e) {
                throw new WrongInputException ("Reading errId: " + e.message);
            }
            
            throw new ErrorAnswerException (errId);
        } else if (ans != "OK") {
            throw new WrongInputException ("Reading OK/ERR: expected OK or ERR")
        }
    }
    
    checkType (lexer, expected) {
        var type;
        
        try {
            type = lexer.readString();
        } catch (e) {
            throw new WrongInputException ("Reading answer type: " + e.message);
        }
        
        if (type != expected)
            throw new WrongInputException ("Expected " + expected);
    }
    
    parseReg (string) {
        var lexer = new Lexer (string);
        
        this.checkType(lexer, "REG_A");
        this.checkError(lexer);
        
        return new RegAnswer();
    }
    
    parseLogin (string) {
        var lexer = new Lexer (string);
        
        this.checkType(lexer, "LOGIN_A");
        this.checkError(lexer);
        
        return new LoginAnswer();
    }
    
    parseListGames (string) {
        var lexer = new Lexer (string);
        var total, listGameInfo = [];
        
        this.checkType(lexer, "LIST_GAMES_A");
        this.checkError(lexer);
        
        try {
            total = lexer.readInteger();
            
            for (var i = 0; i < total; i++) {
                var id, otherUser, color, turn, turnCount;
                
                id = lexer.readInteger();
                otherUser = lexer.readString();
                color = lexer.readString();
                turnCount = lexer.readInteger();
                turn = lexer.readString();
                                
                if (color != 'W' && color != 'B')
                    throw new WrongInputException("Reading color: expected W or B");
                
                if (turn != 'W' && turn != 'B')
                    throw new WrongInputException("Reading turn: expected W or B");
                
                listGameInfo.push(new GameInfo(id, otherUser, (color == 'W'), (turn == 'W'), turnCount));
            }
            
        } catch (e) {
            throw new WrongInputException (e.message);
        } 
        
        return new ListGamesAnswer(listGameInfo);
    }
    
    parseGameMove (string) {
        var ans, lexer = new Lexer (string);
        
        this.checkType(lexer, "GAME_MOVE_A");
        this.checkError(lexer); 
        
        try {
            ans = lexer.readString();
        } catch (e) {
            throw new WrongInputException("Reading ok answer: " + e.message);
        }
        
        if (ans == 'WIN_STATE') {
            var winner;
            try {
                winner = lexer.readString();
            } catch (e) {
                throw new WrongInputException("Reading WIN_STATE winner: " + e.message);
            }
            
            return new GameMoveAnswer(ans, winner);
        } else 
            return new GameMoveAnswer(ans);
    }
    
    parseGameStatus (string) {
        var ans, lexer = new Lexer (string);
        
        this.checkType(lexer, "GAME_STATUS_A");
        this.checkError(lexer); 
        
        try {
            ans = lexer.readString();
        } catch (e) {
            throw new WrongInputException("Reading status: " + e.message);
        }
        
        if (ans == 'WIN_STATE') {
            var winner;
            try {
                winner = lexer.readString();
            } catch (e) {
                throw new WrongInputException("Reading WIN_STATE winner: " + e.message);
            }
            return new GameStatusAnswer (ans, winner);
        } else 
            return new GameStatusAnswer (ans);
    }
    
    parseGameDrop (string) {
        var ans, lexer = new Lexer (string);
        
        this.checkType(lexer, "GAME_DROP_A");
        this.checkError(lexer); 
        
        return new DropAnswer();
    }
    
    parseGameLastMove(string) {
        var lexer = new Lexer (string);
        var x1, y1, x2, y2;
        
        this.checkType(lexer, "GAME_LAST_MOVE_A");
        this.checkError(lexer);
        
        try {
            x1 = lexer.readInteger();
            y1 = lexer.readInteger();
            x2 = lexer.readInteger();
            y2 = lexer.readInteger();
        } catch (e) {
            throw new WrongInputException ("Reading coordinates: " + e.message);
        }
        
        return new GameLastMoveAnswer(x1, y1, x2, y2);
    }
        
    parseGameTurn(string) {
        var turn, lexer = new Lexer (string);
        
        this.checkType(lexer, "GAME_TURN_A");
        this.checkError(lexer); 
        
        try {
            turn = lexer.readString();
        } catch (e) {
            throw new WrongInputException("Reading turn: " + e.message);
        }
        
        if (turn != 'W' && turn != 'B')
            throw new WrongInputException("Reading turn: expected W or B");
        
        return new GameTurnAnswer(turn);
    }
    
    parsePawnPromotion(string) {
        var lexer = new Lexer (string);
        
        this.checkType(lexer, "PAWN_PROMOTION_A");
        this.checkError(lexer); 
        
        return new PawnPromotionAnswer();
    }
    
    parseNewGame(string) {
        var lexer = new Lexer (string);
        
        this.checkType(lexer, "NEW_GAME_A");
        this.checkError(lexer); 
        
        return new NewGameAnswer();
    }

    //FIXME

    parseImportGame(string) {
        var lexer = new Lexer (string);
        
        this.checkType(lexer, "IMPORT_GAME_A");
        this.checkError(lexer);

        //try {
            var imWhite = lexer.readInteger();
            var otherUser = lexer.readString();

            var gameId = lexer.readInteger();
            var importedGame = new Game(gameId, false);

            importedGame.whiteTurn = lexer.readInteger();

            //CURRENT STATE FIXME!!!!!
            var state = new PlayingState(importedGame);
            importedGame.state = state;


            //ENPASSANT
            var hasPassant = lexer.readString();

            var enPassantPiecePos;
            if(hasPassant == "YES") {
                enPassantPiecePos = new Position( lexer.readInteger(), 
                    lexer.readInteger() );

                importedGame.chessMatrix.enPassantDest = new Position( 
                    lexer.readInteger(), lexer.readInteger() );
                
                importedGame.chessMatrix.enPassantLiveTime = lexer.readInteger();

                var nDest = lexer.readInteger();
                for(let i = 0; i < nDest; i++) {
                    importedGame.chessMatrix.enPassantOrigin.push( new Position(
                        lexer.readInteger(), lexer.readInteger() ) );
                }
            }

            //KING

            //var pieces = { kingW, kingB, queenW: [], queenB: [], pawnW: [], pawnB: [],
            //    rookW: [], rookB: [], knightW: [], knightB: [], bishopW: [], bishopB: []};
            importedGame.kingW = new KingPiece(undefined,undefined,undefined,importedGame,undefined);
            this.readMovePiece(importedGame.kingW, true, importedGame, lexer);
            
            importedGame.kingB = new KingPiece(undefined,undefined,undefined,importedGame,undefined);
            this.readMovePiece(importedGame.kingB, false, importedGame, lexer);

            this.readQueen(importedGame,lexer);
            this.readPawn(importedGame,lexer);
            this.readRook(importedGame,lexer);
            this.readKnight(importedGame,lexer);
            this.readBishop(importedGame,lexer);

            if(hasPassant == "YES")
                importedGame.chessMatrix.enPassantPiece = importedGame.getCell(enPassantPiecePos);

            return new ImportGameAnswer(imWhite == 1 ? true : false, otherUser, importedGame);

        /*} catch(e) {
            throw new WrongInputException("Reading Game Import:" + e.message);
        }*/
    }

    readQueen(importedGame, lexer) {

        var nPieces = lexer.readInteger();
        for(let i = 0; i < nPieces; i++) {
            var pW = new QueenPiece(undefined,undefined,undefined,importedGame,undefined);
            this.readPiece(pW, true, importedGame, lexer);
            importedGame.queenW.push(pW);
        }

        nPieces = lexer.readInteger();
        for(let i = 0; i < nPieces; i++) {
            var pB = new QueenPiece(undefined,undefined,undefined,importedGame,undefined);
            this.readPiece(pB, false, importedGame, lexer);
            importedGame.queenB.push(pB);
        }
    }

    readPawn(importedGame, lexer) {

        var nPieces = lexer.readInteger();
        for(let i = 0; i < nPieces; i++) {
            var pW = new PawnPiece(undefined,undefined,undefined,importedGame,undefined);
            this.readMovePiece(pW, true, importedGame, lexer);
            importedGame.pawnW.push(pW);
        }

        nPieces = lexer.readInteger();
        for(let i = 0; i < nPieces; i++) {
            var pB = new PawnPiece(undefined,undefined,undefined,importedGame,undefined);
            this.readMovePiece(pB, false, importedGame, lexer);
            importedGame.pawnB.push(pB);
        }

    }

    readRook(importedGame, lexer) {

        var nPieces = lexer.readInteger();
        for(let i = 0; i < nPieces; i++) {
            var pW = new RookPiece(undefined,undefined,undefined,importedGame,undefined);
            this.readMovePiece(pW, true, importedGame, lexer);
            importedGame.rookW.push(pW);
        }

        nPieces = lexer.readInteger();
        for(let i = 0; i < nPieces; i++) {
            var pB = new RookPiece(undefined,undefined,undefined,importedGame,undefined);
            this.readMovePiece(pB, false, importedGame, lexer);
            importedGame.rookB.push(pB);
        }

    }

    readKnight(importedGame, lexer) {

        var nPieces = lexer.readInteger();
        for(let i = 0; i < nPieces; i++) {
            var pW = new KnightPiece(undefined,undefined,undefined,importedGame,undefined);
            this.readPiece(pW, true, importedGame, lexer);
            importedGame.knightW.push(pW);
        }

        nPieces = lexer.readInteger();
        for(let i = 0; i < nPieces; i++) {
            var pB = new KnightPiece(undefined,undefined,undefined,importedGame,undefined);
            this.readPiece(pB, false, importedGame, lexer);
            importedGame.knightB.push(pB);
        }
    }

    readBishop(importedGame, lexer) {

        var nPieces = lexer.readInteger();
        for(let i = 0; i < nPieces; i++) {
            var pW = new BishopPiece(undefined,undefined,undefined,importedGame,undefined);
            this.readPiece(pW, true, importedGame, lexer);
            importedGame.bishopW.push(pW);
        }

        nPieces = lexer.readInteger();
        for(let i = 0; i < nPieces; i++) {
            var pB = new BishopPiece(undefined,undefined,undefined,importedGame,undefined);
            this.readPiece(pB, false, importedGame, lexer);
            importedGame.bishopB.push(pB);
        }
    }
    
    readMovePiece(p, white, importedGame, lexer) {    
        this.readPiece(p, white, importedGame, lexer);

        var hasMoved = lexer.readInteger();
        p.hasMoved = hasMoved == 1 ? true : false;
    }

    readPiece(p, white, importedGame, lexer) {
        var id = lexer.readInteger();
        var pos = new Position( lexer.readInteger(), lexer.readInteger() );
        var forward = lexer.readInteger();
        var alive = lexer.readInteger();

        p.set(id,white, pos, importedGame, forward == 1 ? true : false, );
        p.alive = alive == 1 ? true : false;

        if(p.alive) {
            importedGame.chessMatrix.set(pos,p);
            p.setPos(pos);
            p.visual.changePos(false);
            p.makeVisual();
        }
        else {
            var newPos = importedGame.pushDead(p);
            p.setPos(newPos);
            p.visual.changePos(false);
            p.makeVisual();
        }
    }
}

//Missing: I'm white? CurrentState? whiteTurn? 
