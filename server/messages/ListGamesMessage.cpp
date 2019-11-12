#include "ListGamesMessage.h"
#include "MessageVisitor.h"

ListGamesMessage::ListGamesMessage(const std::string& user, const std::string& pass, int gameId): 
    _user(user), _pass(pass), _gameId(gameId) 
{

}

void ListGamesMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitListGames(this);
}
