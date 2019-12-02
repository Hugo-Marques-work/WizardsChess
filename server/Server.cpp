#include "Server.h"

Server::Server () {
    
}

std::string Server::visitReg (RegMessage* message) 
{
    if (_players.find(message->user()) == _players.end())
    {
        Player* player = new Player (message->user(), message->pass());
        _players.insert(std::make_pair(message->user(), player));
        return "REG_A OK";
    }
    else
    {
        return "REG_A USER_USED";
    }
}

std::string Server::visitListGames (ListGamesMessage* message)
{
    std::map<std::string, Player*>::iterator it;
    
    if ((it = _players.find(message->user())) == _players.end())
    {
        Player* player = it->second;
        const std::map <int, Game*> & games = player->games();
        std::map <int, Game*>::const_iterator it;
        std::string result ("LIST_GAMES_A");
        
        for (it = games.cbegin(); it != games.cend(); it ++)
        {
            Game* game = it->second;
            if (game->playerW() == player)
                result += " " + std::to_string(game->gameId()) + " " + game->playerB()->user();
            else
                result += " " + std::to_string(game->gameId()) + " " + game->playerW()->user();
        }
        
        return result;
    }
    else 
    {
        return "LIST_GAMES_A USER_NOT_FOUND";
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
    for (std::map<std::string, Player*>::iterator it = _players.begin(); 
         it != _players.end(); it++) 
    {
        delete it->second;
    }
}
