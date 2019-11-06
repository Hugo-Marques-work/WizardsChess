#include "GameMoveMessage.h"

void GameMoveMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitGameMove(this);
}
