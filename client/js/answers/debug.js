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
    constructor (gameId, otherUser, color) {
        this.gameId = gameId;
        this.otherUser = otherUser;
        this.isWhite = color;
    }
}

class ListGamesAnswer extends Answer {
    constructor (listGameInfo) {
        super();
        this.listGameInfo = listGameInfo;
    }
}

class GameStatusAnswer extends Answer {
    constructor (status) {
        super();
        this.status = status;
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
    constructor (info) {
        super();
        this.info = info;

        if(this.info === "NEXT"/*FIXME MESSAGE*/)
            this.isNext = true;
        else 
            this.isNext = false;
    }

    isPromote() {
        return !this.isNext;
    }

    isNext() {
        return this.isNext;
    }
}

class GameLastMoveAnswer extends Answer {
    constructor (x1, y1, x2, y2) {
        super();
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
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

// AnswerParser.js
class AnswerParser {
    checkError (lexer) {
        var ans;
        
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
                var id, otherUser, color;
                
                id = lexer.readInteger();
                otherUser = lexer.readString();
                color = lexer.readString()
                
                if (color != 'W' && color != 'B')
                    throw new WrongInputException("Reading color: expected W or B");
                
                listGameInfo.push(new GameInfo(id, otherUser, color));
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
        
        return new GameStatusAnswer(ans);
    }
    
    parseGameDrop (string) {
        var ans, lexer = new Lexer (string);
        
        this.checkType(lexer, "GAME_DROP_A");
        this.checkError(lexer); 
        
        return new GameDropAnswer();
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
}
