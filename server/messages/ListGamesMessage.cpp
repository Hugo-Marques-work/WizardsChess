#include "ListGamesMessage.h"
#include "MessageVisitor.h"

ListGamesMessage::ListGamesMessage()
{

}

std::string ListGamesMessage::accept (MessageVisitor* visitor, Session* session) 
{
    return visitor->visitListGames(this, session);
}
