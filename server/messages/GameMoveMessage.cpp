#include "GameMoveMessage.h"
#include "MessageVisitor.h"

GameMoveMessage::GameMoveMessage (const std::string& user, const std::string& pass, 
                     int gameId, 
                     int x1, int y1, 
                     int x2, int y2) : _user(user), _pass(pass), _gameId(gameId), 
                     _x1(x1), _x2(x2), _y1(y1), _y2(y2)
{
    
}

void GameMoveMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitGameMove(this);
}
