#include "GameLastMoveMessage.h"
#include "MessageVisitor.h"

GameLastMoveMessage::GameLastMoveMessage(const std::string& user, const std::string& pass, int gameId): 
    _user(user), _pass(pass), _gameId(gameId) 
{
    
}

void GameLastMoveMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitGameLastMove(this);
}
