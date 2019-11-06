#include "GameDropMessage.h"
#include "MessageVisitor.h"

void GameDropMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitGameDrop(this);
}
