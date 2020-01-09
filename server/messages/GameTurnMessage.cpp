#include "GameTurnMessage.h"
#include "MessageVisitor.h"

GameTurnMessage::GameTurnMessage(const std::string& user, const std::string& pass, int gameId): 
    _user(user), _pass(pass), _gameId(gameId) 
{

}

std::string GameTurnMessage::accept (MessageVisitor* visitor, Session* session) 
{
    return visitor->visitGameTurn(this, session);
}
