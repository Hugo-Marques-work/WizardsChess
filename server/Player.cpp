#include "Player.h"
#include "exceptions/NoSuchGameException.h"

Player::Player (const std::string& userId, const std::string& password)
{
    _userId = userId;
    _password = password;
}

bool Player::validatePassword (const std::string& guess) 
{
    return guess == _password;
}

void Player::addGame (Game* game) 
{
    _games.insert(std::make_pair(game->gameId(), game));
}

Game* Player::searchGame (int gameId) 
{
    std::map<int, Game*>::iterator it;
    
    if ((it = _games.find(gameId)) != _games.end())
        return it->second;
    else
        return nullptr;
}

void Player::dropGame (int gameId) 
{
    Game* game = searchGame(gameId);
    
    if (game != nullptr) 
    {
    }
    else
        throw NoSuchGameException();
}
