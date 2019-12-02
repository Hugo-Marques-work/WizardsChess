#include "Player.h"

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
