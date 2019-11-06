#include "ListGamesMessage.h"

void ListGamesMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitListGames(this);
}
