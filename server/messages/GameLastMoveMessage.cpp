#include "GameLastMoveMessage.h"
#include "MessageVisitor.h"

GameLastMoveMessage::GameLastMoveMessage(const std::string& user, const std::string& pass, int gameId): 
    _user(user), _pass(pass), _gameId(gameId) 
{
    
}

std::string GameLastMoveMessage::accept (MessageVisitor* visitor) 
{
    return visitor->visitGameLastMove(this);
}
