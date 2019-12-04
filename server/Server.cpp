#include "Server.h"

Server::Server () : _nextGameId (1)
{    
}

Player* Server::searchPlayer (const std::string& user)
{
    std::map<std::string, Player*>::iterator it;
    
    if ((it = _players.find(user)) != _players.end())
        return it->second;
    else
        return nullptr;
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
    Player* player;
    
    if ((player = searchPlayer(message->user())) != nullptr)
    {
        if (player->validatePassword(message->pass()))
        {
            std::string result ("LIST_GAMES_A ");
            
            result += std::to_string(player->games().count());
            
            for (std::pair <int, Game*> pair : player->games())
            {
                Game* game = pair.second;
                if (game->playerW() == player)
                    result += " " + std::to_string(game->gameId()) + " " + game->playerB()->user() + " W";
                else
                    result += " " + std::to_string(game->gameId()) + " " + game->playerW()->user() + " B";
            }
            
            return result;
        }
        else
            return "LIST_GAMES_A ERR_PASSWORD";
    }
    else 
        return "LIST_GAMES_A ERR_USER_NOT_FOUND";
}

std::string Server::visitGameMove (GameMoveMessage* message)
{
    Player* player;
    
    if ((player = searchPlayer(message->user())) != nullptr)
    {
        if (player->validatePassword(message->pass()))
        {
            Game* game = player->searchGame (message->gameId());

            if (game == nullptr)
                return "GAME_MOVE_A ERR_GAME_NOT_FOUND";
            
            try 
            {
                game->move (Position (message->x1(), message->y1()), 
                            Position(message->x2(), message->y2()));
            }
            catch (...)
            {
                return "GAME_MOVE_A ERR_MOVE";
            }
            
            return "GAME_MOVE_A OK";
        }
        else
            return "GAME_MOVE_A ERR_PASSWORD";
    }
    else 
        return "GAME_MOVE_A USER_NOT_FOUND";
}

std::string Server::visitGameStatus (GameStatusMessage* message)
{
    
}

std::string Server::visitGameDrop (GameDropMessage* message)
{
    Player* player;
    
    if ((player = searchPlayer(message->user())) != nullptr)
    {
        if (player->validatePassword(message->pass()))
        {   
            try
            {
                player->drop(message->gameId());
            }
            catch (...)
            {
                return "GAME_DROP_A ERR";
            }
            
            return "GAME_DROP_A OK";
        }
        else
            return "GAME_DROP_A ERR_PASSWORD";
    }
    else 
        return "GAME_DROP_A USER_NOT_FOUND";
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

std::string Server::visitNewGame (NewGameMessage* message)
{
    Player *player1, *player2;
    
    player1 = searchPlayer(message->user1());
    player2 = searchPlayer(message->user2());
    
    if (player1 == nullptr || player2 == nullptr)
        return "NEW_GAME_A USER_NOT_FOUND";
    
    Game* game = new Game (_nextGameId, player1, player2);
    
    _games.insert (std::make_pair (_nextGameId, game));
    
    player1->addGame (game);
    player2->addGame (game);
    
    _nextGameId++;
    
    return "NEW_GAME_A OK";
}

Server::~Server () 
{
    std::map<std::string, Player*>::iterator it1;
    std::map<std::string, Game*>::iterator it2;
    
    for (it1 = _players.begin(); it1 != _players.end(); it1++) 
        delete it1->second;
    
    for (it2 = _players.begin(); it2 != _players.end(); it2++) 
        delete it2->second;
}
