#include "GameLastTurnMessage.h"
#include "MessageVisitor.h"

GameLastTurnMessage::GameLastTurnMessage(const std::string& user, const std::string& pass, int gameId): 
    _user(user), _pass(pass), _gameId(gameId) 
{

}

void GameLastTurnMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitGameLastTurn(this);
}
