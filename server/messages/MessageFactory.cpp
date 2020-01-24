#include "MessageFactory.h"
#include "RegMessage.h"
#include "ListGamesMessage.h"
#include "GameMoveMessage.h"
#include "GameStatusMessage.h"
#include "GameDropMessage.h"
#include "GameLastMoveMessage.h"
#include "GameTurnMessage.h"
#include "PawnPromotionMessage.h"
#include "NewGameMessage.h"
#include "LoginMessage.h"
#include "ImportGameMessage.h"
#include "../exceptions/WrongInputException.h"
#include "../exceptions/ParserException.h"

Message* MessageFactory::parse (const std::string& string)
{
    Parser parser (string);
    std::string command;
    
    try 
    {
        command = parser.readString ();    
    } 
    
    catch (ParserException& e)
    {
        throw WrongInputException("Error reading command name.");
    }
        
    if (command == "REG_R")
        return parseReg(parser);
    
    else if (command == "LIST_GAMES_R")
        return parseListGames(parser);
    
    else if (command == "GAME_MOVE_R")
        return parseGameMove(parser);
    
    else if (command == "GAME_STATUS_R")
        return parseGameStatus(parser);
    
    else if (command == "GAME_DROP_R")
        return parseGameDrop(parser);
    
    else if (command == "GAME_TURN_R")
        return parseGameTurn(parser);
    
    else if (command == "GAME_LAST_MOVE_R")
        return parseGameLastMove(parser);
    
    else if (command == "PAWN_PROMOTION_R")
        return parsePawnPromotion(parser);
    
    else if (command == "NEW_GAME_R")
        return parseNewGame(parser);
    
    else if (command == "LOGIN_R")
        return parseLogin(parser);
    
    else if (command == "IMPORT_GAME_R")
        return parseImportGame(parser);

    else
        throw WrongInputException("Command not found.");
}

Message* MessageFactory::parseReg (Parser& parser)
{
    std::string user, pass;
    
    try 
    {
        user = parser.readString();
        pass = parser.readString();
    }
    
    catch ( ParserException& e )
    {
        throw WrongInputException(e.what());
    }
    
    return new RegMessage (user, pass);
}

Message* MessageFactory::parseListGames (Parser& parser)
{   
    return new ListGamesMessage ();
}

Message* MessageFactory::parseGameMove (Parser& parser)
{
    int gameId, x1, y1, x2, y2;
    
    try 
    {
        gameId = parser.readInteger();
        x1 = parser.readInteger();
        y1 = parser.readInteger();
        x2 = parser.readInteger();
        y2 = parser.readInteger();
    }
    
    catch ( ParserException& e )
    {
        throw WrongInputException(e.what());
    }
    
    return new GameMoveMessage (gameId, x1, y1, x2, y2);
}

Message* MessageFactory::parseGameStatus (Parser& parser)
{
    int gameId;
    
    try 
    {
        gameId = parser.readInteger();
    }
    
    catch ( ParserException& e )
    {
        throw WrongInputException(e.what());
    }
    
    return new GameStatusMessage (gameId);
}

Message* MessageFactory::parseGameDrop (Parser& parser)
{
    int gameId;
    
    try 
    {
        gameId = parser.readInteger();
    }
    
    catch ( ParserException& e )
    {
        throw WrongInputException(e.what());
    }
    
    return new GameDropMessage (gameId);
}

Message* MessageFactory::parseGameTurn(Parser& parser) 
{
    int gameId;
    
    try 
    {
        gameId = parser.readInteger();
    }
    
    catch ( ParserException& e )
    {
        throw WrongInputException(e.what());
    }
    
    return new GameTurnMessage (gameId);
}

Message* MessageFactory::parseGameLastMove(Parser& parser) 
{
    int gameId;
    
    try 
    {
        gameId = parser.readInteger();
    }
    
    catch ( ParserException& e )
    {
        throw WrongInputException(e.what());
    }
    
    return new GameLastMoveMessage (gameId);
}

Message* MessageFactory::parsePawnPromotion(Parser& parser) 
{
    std::string pieceType;
    int gameId;
    
    try 
    {
        gameId = parser.readInteger();
        pieceType = parser.readString();
    }
    
    catch ( ParserException& e )
    {
        throw WrongInputException(e.what());
    }
    
    return new PawnPromotionMessage (gameId, pieceType);
}

Message* MessageFactory::parseNewGame(Parser& parser)
{
    std::string user;
    
    try
    {
        user = parser.readString();
    }
    
    catch ( ParserException& e )
    {
        throw WrongInputException(e.what());
    }
    
    return new NewGameMessage (user);
}

Message* MessageFactory::parseLogin(Parser& parser)
{
    std::string user, pass;
    
    try
    {
        user = parser.readString();
        pass = parser.readString();
    }
    
    catch ( ParserException& e )
    {
        throw WrongInputException(e.what());
    }
    
    return new LoginMessage (user, pass);
}

Message* MessageFactory::parseImportGame(Parser& parser)
{
    int gameId;
    
    try 
    {
        gameId = parser.readInteger();
    }
    
    catch ( ParserException& e )
    {
        throw WrongInputException(e.what());
    }
    
    return new ImportGameMessage (gameId);
}
