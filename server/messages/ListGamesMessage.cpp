#include "ListGamesMessage.h"
#include "MessageVisitor.h"

ListGamesMessage::ListGamesMessage(const std::string& user, const std::string& pass): 
    _user(user), _pass(pass)
{

}

std::string ListGamesMessage::accept (MessageVisitor* visitor, Session* session) 
{
    return visitor->visitListGames(this, session);
}
