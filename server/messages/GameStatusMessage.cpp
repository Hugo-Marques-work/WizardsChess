#include "GameStatusMessage.h"

void GameStatusMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitGameStatus(this);
}
