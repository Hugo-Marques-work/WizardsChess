#include "GameMoveMessage.h"
#include "MessageVisitor.h"

void GameMoveMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitGameMove(this);
}
