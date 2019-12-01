#include "GameDropMessage.h"
#include "MessageVisitor.h"

GameDropMessage::GameDropMessage(const std::string& user, const std::string& pass, int gameId): 
    _user(user), _pass(pass), _gameId(gameId) 
{

}


std::string GameDropMessage::accept (MessageVisitor* visitor) 
{
    return visitor->visitGameDrop(this);
}
