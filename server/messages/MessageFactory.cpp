#include "MessageFactory.h"
#include "../exceptions/WrongInputException.h"

Message* MessageFactory::parse (const char* string)
{    
    std::stringstream sstream (string);
    std::string command;
    
    sstream.exceptions(std::ios::eofbit | std::ios::failbit | std::ios::badbit);
    
    try 
    {
        sstream >> command;
    } 
    
    catch ( std::exception& e )
    {
        throw WrongInputException(e.what());
    }
        
    if (command == "REG_R")
        return parseReg(sstream);
    
    else if (command == "LIST_GAMES_R")
        return parseListGames(sstream);
    
    else if (command == "GAME_MOVE_R")
        return parseGameMove(sstream);
    
    else if (command == "GAME_STATUS_R")
        return parseGameStatus(sstream);
    
    else if (command == "GAME_DROP_R")
        return parseGameDrop(sstream);
    
    else if (command == "GAME_LAST_TURN_R")
        return parseGameLastTurn(sstream);
    
    else if (command == "GAME_LAST_MOVE_R")
        return parseGameLastMove(sstream);

    else
        throw WrongInputException("Command not found");
}

Message* MessageFactory::parseReg (std::stringstream& string)
{
    std::string user, pass;
    
    try 
    {
        string >> user >> pass;
    }
    
    catch ( std::exception& e )
    {
        throw WrongInputException(e.what());
    }
    
    return new RegMessage (user, pass);
}

Message* MessageFactory::parseListGames (std::stringstream& string)
{
    std::string user, pass;
    int gameId;
    
    try 
    {
        string >> user >> pass >> gameId;
    }
    
    catch ( std::exception& e )
    {
        throw WrongInputException(e.what());
    }
    
    return new ListGamesMessage (user, pass, gameId);
}

Message* MessageFactory::parseGameMove (std::stringstream& string)
{
    std::string user, pass;
    int gameId, x1, y1, x2, y2;
    
    try 
    {
        string >> user >> pass >> gameId >> x1 >> y1 >> x2 >> y2;
    }
    
    catch ( std::exception& e )
    {
        throw WrongInputException(e.what());
    }
    
    return new GameMoveMessage (user, pass, gameId, x1, y1, x2, y2);
}

Message* MessageFactory::parseGameStatus (std::stringstream& string)
{
    std::string user, pass;
    int gameId;
    
    try 
    {
        string >> user >> pass >> gameId;
    }
    
    catch ( std::exception& e )
    {
        throw WrongInputException(e.what());
    }
    return new GameStatusMessage (user, pass, gameId);
}

Message* MessageFactory::parseGameDrop (std::stringstream& string)
{
    std::string user, pass;
    int gameId;
    
    try 
    {
        string >> user >> pass >> gameId;
    }
    
    catch ( std::exception& e )
    {
        throw WrongInputException(e.what());
    }
    return new GameDropMessage (user, pass, gameId);
}

Message* MessageFactory::parseGameLastTurn(std::stringstream& string) 
{
    std::string user, pass;
    int gameId;
    
    try 
    {
        string >> user >> pass >> gameId;
    }
    
    catch ( std::exception& e )
    {
        throw WrongInputException(e.what());
    }
    
    return new GameLastTurnMessage (user, pass, gameId);
}

Message* MessageFactory::parseGameLastMove(std::stringstream& string) 
{
    std::string user, pass;
    int gameId;
    
    try 
    {
        string >> user >> pass >> gameId;
    }
    
    catch ( std::exception& e )
    {
        throw WrongInputException(e.what());
    }
    
    return new GameLastMoveMessage (user, pass, gameId);
}
