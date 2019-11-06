#include "ListGamesMessage.h"
#include "MessageVisitor.h"

void ListGamesMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitListGames(this);
}
