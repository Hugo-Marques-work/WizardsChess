#include "GameMoveMessage.h"
#include "MessageVisitor.h"

GameMoveMessage::GameMoveMessage (int gameId, 
                     int x1, int y1, 
                     int x2, int y2) : _gameId(gameId), 
                     _x1(x1), _x2(x2), _y1(y1), _y2(y2)
{
    
}

std::string GameMoveMessage::accept (MessageVisitor* visitor, Session* session) 
{
    return visitor->visitGameMove(this, session);
}
