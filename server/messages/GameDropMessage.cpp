#include "GameDropMessage.h"
#include "MessageVisitor.h"

GameDropMessage::GameDropMessage(const std::string& user, const std::string& pass, int gameId): 
    _user(user), _pass(pass), _gameId(gameId) 
{

}


void GameDropMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitGameDrop(this);
}
