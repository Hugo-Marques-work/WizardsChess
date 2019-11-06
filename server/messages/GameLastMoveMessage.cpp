#include "GameLastTurnMessage.h"

void GameLastMoveMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitGameLastMove(this);
}
