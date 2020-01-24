#include "GameLastMoveMessage.h"
#include "MessageVisitor.h"

GameLastMoveMessage::GameLastMoveMessage(int gameId): 
    _gameId(gameId) 
{
    
}

std::string GameLastMoveMessage::accept (MessageVisitor* visitor, Session* session) 
{
    return visitor->visitGameLastMove(this, session);
}
