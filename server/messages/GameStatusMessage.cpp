#include "GameStatusMessage.h"
#include "MessageVisitor.h"

void GameStatusMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitGameStatus(this);
}
