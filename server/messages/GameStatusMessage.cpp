#include "GameStatusMessage.h"
#include "MessageVisitor.h"

GameStatusMessage::GameStatusMessage(const std::string& user, const std::string& pass, int gameId): 
    _user(user), _pass(pass), _gameId(gameId) 
{

}

std::string GameStatusMessage::accept (MessageVisitor* visitor) 
{
    return visitor->visitGameStatus(this);
}
