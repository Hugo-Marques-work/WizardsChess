/*each method can throw either 
 * WrongInputException
 * ErrorAnswerException
 */

class AnswerParser {
    checkError (lexer) {
        try {
            ans = lexer.readString();
        } catch (e) {
            throw new WrongInputException ("Reading ans (OK/ERR): " + e.message);
        }
        
        if (ans == "ERR") {
            try {
                var errId = lexer.readString();
            } catch (e) {
                throw new WrongInputException ("Reading errId: " + e.message);
            }
            
            throw ErrorAnswerException (errId);
        }
    }
    
    parseReg (string) {
        var lexer = new Lexer (string);
        var type, ans;
        
        try {
            type = lexer.readString();
        } catch (e) {
            throw new WrongInputException ("Reading answer type: " + e.message);
        } 
        
        if (type != "REG_A")
            throw new WrongInputException ("Expected REG_A");
        
        this.checkError();
        
        return new RegAnswer();
    }
    
    parseListGames (string) {
        var lexer = new Lexer (string);
        var type, total, listGameInfo = [];
        
        try {
            type = lexer.readString();
        } catch (e) {
            throw new WrongInputException ("Reading answer type: " + e.message);
        }
        
        if (type != "LIST_GAMES_A")
            throw new WrongInputException ("Expected LIST_GAMES_A");
        
        this.checkError();
        
        try {
            total = lexer.readInteger();
            
            for (var i = 0; i < total; i++) {
                var id, otherUser, color, isWhite;
                
                id = lexer.readInteger();
                otherUser = lexer.readString();
                if (! ((color = lexer.readString()) in ['W', 'B']))
                    throw new WrongInputException("Expected color in {'W', 'B'}");
                
                isWhite = (color == 'W');
                
                listGameInfo.push(new GameInfo(id, otherUser, isWhite));
            }
            
        } catch (e) {
            throw new WrongInputException (e.message);
        } 
        
        return new ListGamesAnswer(listGameInfo);
    }
    
    parseGameMove (string) {
        var lexer = new Lexer (string);
        var type, ans;
        
        try {
            type = lexer.readString();
        } catch (e) {
            throw new WrongInputException (e.message);
        } 
        
        if (type != "GAME_MOVE_A")
            throw new WrongInputException ("Expected GAME_MOVE_A");
        
        this.checkError(); 
        
        return new GameMoveAnswer(ans);
    }
    
    parseGameStatus (string) {
        
    }
    
    parseGameDrop (string) {
        
    }
    
    parseGameLastMove(string) {
        
    }
    
    parseGameTurn(string) {
        
    }
    
    parsePawnPromotion(string) {
        
    }
    
    parseNewGame(string) {
        
    }
}
