#include "GameLastTurnMessage.h"
#include "MessageVisitor.h"

void GameLastMoveMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitGameLastMove(this);
}
