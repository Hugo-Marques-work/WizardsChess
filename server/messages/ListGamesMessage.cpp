#include "ListGamesMessage.h"
#include "MessageVisitor.h"

ListGamesMessage::ListGamesMessage(const std::string& user, const std::string& pass, int gameId): 
    _user(user), _pass(pass), _gameId(gameId) 
{

}

std::string ListGamesMessage::accept (MessageVisitor* visitor) 
{
    return visitor->visitListGames(this);
}
