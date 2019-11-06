#include "GameDropMessage.h"

void GameDropMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitGameDrop(this);
}
