#include "GameStatusMessage.h"
#include "MessageVisitor.h"

GameStatusMessage::GameStatusMessage(const std::string& user, const std::string& pass, int gameId): 
    _user(user), _pass(pass), _gameId(gameId) 
{

}

void GameStatusMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitGameStatus(this);
}
