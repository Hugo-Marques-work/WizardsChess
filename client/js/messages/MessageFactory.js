class MessageFactory {
    parse (string) {
        var command, parser = new Parser (string);
        
        try {
            command = parser.parseString ();
        } catch (e) {
            throw new WrongAnswerException ("Error reading command name.");
        }
        
        switch (command) {
            case "REG_A": 
                return parseReg(parser); break;
            case "LIST_GAMES_A": 
                return parseListGames(parser); break;
            case "GAME_MOVE_A":
                return parseGameMove(parser); break;
            case "GAME_STATUS_A":
                return parseGameStatus(parser); break;
            case "GAME_DROP_A":
                return parseGameDrop(parser); break;
            case "GAME_TURN_A":
                return parseGameTurn(parser); break;
            case "GAME_LAST_MOVE_A":
                return parseGameLastMove(parser); break;
            case "PAWN_PROMOTION_A":
                return parsePawnPromotion(parser); break;
            case "NEW_GAME_A":
                return parseNewGame(parser); break;
            default:
                throw WrongInputException("Command not found.");
        }
    }
    
    parseReg (parser) {
        var user, pass;
    
        try {
            user = parser.readString();
            pass = parser.readString();
        }

        catch (e) {
            throw WrongInputException(e.message);
        }

        return new RegMessage (user, pass);
    }
    
    parseListGames (parser) {
        
    }
    
    parseGameMove (parser) {
        
    }
    
    parseGameStatus (parser) {
        
    }
    
    parseGameDrop (parser) {
        
    }
    
    parseGameLastMove(parser) {
        
    }
    
    parseGameTurn(parser) {
        
    }
    
    parsePawnPromotion(parser) {
        
    }
    
    parseNewGame(parser) {
        
    }
}
