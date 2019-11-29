#include "MessageFactory.h"
#include "RegMessage.h"
#include "ListGamesMessage.h"
#include "GameMoveMessage.h"
#include "GameStatusMessage.h"
#include "GameDropMessage.h"
#include "GameLastMoveMessage.h"
#include "GameLastTurnMessage.h"
#include "../exceptions/WrongInputException.h"
#include "../exceptions/ParserException.h"

Message* MessageFactory::parse (const char* string)
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
    
    else if (command == "GAME_LAST_TURN_R")
        return parseGameLastTurn(parser);
    
    else if (command == "GAME_LAST_MOVE_R")
        return parseGameLastMove(parser);

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
    std::string user, pass;
    int gameId;
    
    try 
    {
        user = parser.readString();
        pass = parser.readString();
        gameId = parser.readInteger();
    }
    
    catch ( ParserException& e )
    {
        throw WrongInputException(e.what());
    }
    
    return new ListGamesMessage (user, pass, gameId);
}

Message* MessageFactory::parseGameMove (Parser& parser)
{
    std::string user, pass;
    int gameId, x1, y1, x2, y2;
    
    try 
    {
        user = parser.readString();
        pass = parser.readString();
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
    
    return new GameMoveMessage (user, pass, gameId, x1, y1, x2, y2);
}

Message* MessageFactory::parseGameStatus (Parser& parser)
{
    std::string user, pass;
    int gameId;
    
    try 
    {
        user = parser.readString();
        pass = parser.readString();
        gameId = parser.readInteger();
    }
    
    catch ( ParserException& e )
    {
        throw WrongInputException(e.what());
    }
    
    return new GameStatusMessage (user, pass, gameId);
}

Message* MessageFactory::parseGameDrop (Parser& parser)
{
    std::string user, pass;
    int gameId;
    
    try 
    {
        user = parser.readString();
        pass = parser.readString();
        gameId = parser.readInteger();
    }
    
    catch ( ParserException& e )
    {
        throw WrongInputException(e.what());
    }
    
    return new GameDropMessage (user, pass, gameId);
}

Message* MessageFactory::parseGameLastTurn(Parser& parser) 
{
    std::string user, pass;
    int gameId;
    
    try 
    {
        user = parser.readString();
        pass = parser.readString();
        gameId = parser.readInteger();
    }
    
    catch ( ParserException& e )
    {
        throw WrongInputException(e.what());
    }
    
    return new GameLastTurnMessage (user, pass, gameId);
}

Message* MessageFactory::parseGameLastMove(Parser& parser) 
{
    std::string user, pass;
    int gameId;
    
    try 
    {
        user = parser.readString();
        pass = parser.readString();
        gameId = parser.readInteger();
    }
    
    catch ( ParserException& e )
    {
        throw WrongInputException(e.what());
    }
    
    return new GameLastMoveMessage (user, pass, gameId);
}