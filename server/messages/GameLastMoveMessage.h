#ifndef GAMELASTMOVEMESSAGE_H
#define GAMELASTMOVEMESSAGE_H

#include "Message.h"
#include <string>

class GameLastMoveMessage : public Message
{
private:
    int _gameId;
public:
    GameLastMoveMessage(int gameId);
    std::string accept (MessageVisitor* visitor, Session* session);
    
    int gameId() { return _gameId; }
};

#endif
