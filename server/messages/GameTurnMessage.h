#ifndef GAMETURNMESSAGE_H
#define GAMETURNMESSAGE_H

#include "Message.h"
#include <string>

class GameTurnMessage : public Message
{
private:
    int _gameId;
public:
    GameTurnMessage(int gameId);
    std::string accept (MessageVisitor* visitor, Session* session);
    
    int gameId() { return _gameId; }
};

#endif
