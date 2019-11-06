#include "GameLastTurnMessage.h"
#include "MessageVisitor.h"

void GameLastTurnMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitGameLastTurn(this);
}
