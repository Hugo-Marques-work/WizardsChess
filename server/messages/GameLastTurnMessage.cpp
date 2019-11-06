#include "GameLastTurnMessage.h"

void GameLastTurnMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitGameLastTurn(this);
}
