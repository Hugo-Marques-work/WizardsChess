#ifndef GAMEMOVEMESSAGE_H
#define GAMEMOVEMESSAGE_H

#include "Message.h"
#include <string>

class GameMoveMessage : public Message
{
private:
    int _gameId, _x1, _y1, _x2, _y2;
public:
    GameMoveMessage (int gameId, 
                     int x1, int y1, 
                     int x2, int y2);
    std::string accept (MessageVisitor* visitor, Session* session);
    
    int gameId() { return _gameId; }
    
    int x1 () {return _x1;}
    int y1 () {return _y1;}
    int x2 () {return _x2;}
    int y2 () {return _y2;}
};

#endif
