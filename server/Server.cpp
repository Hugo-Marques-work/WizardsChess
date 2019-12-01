#include "Server.h"

std::string Server::visitReg (RegMessage* message) 
{
    if (_player.find(message->user()) == _player.end())
    {
        Player* player = new Player (message->user(), message->pass());
        _players.insert(message->user(), player);
        return "REG_A OK";
    }
    else
    {
        return "REG_A NOT_UNIQUE";
    }
}

std::string Server::visitListGames (ListGamesMessage* message)
{
    std::map<std::string, Player*>::iterator it;
    
    if ((it = _player.find(message->user())) == _player.end())
    {
        Player* player = it->second;
        
        
        
        return "REG_A OK";
    }   
}

std::string Server::visitGameMove (GameMoveMessage* message)
{
    
}

std::string Server::visitGameStatus (GameStatusMessage* message)
{
    
}

std::string Server::visitGameDrop (GameDropMessage* message)
{
    
}

std::string Server::visitGameLastTurn (GameLastTurnMessage* message)
{
    
}

std::string Server::visitGameLastMove (GameLastMoveMessage* message)
{
    
}

std::string Server::visitPawnPromotion (PawnPromotionMessage* message) 
{
    
}

Server::~Server () 
{
    for (std::map::iterator& it = _players.begin(); it != _players.end(); it++) 
    {
        delete it.second;
    }
}
