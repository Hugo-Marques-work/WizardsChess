#ifndef GAMESTATUSMESSAGE_H
#define GAMESTATUSMESSAGE_H

#include "Message.h"
#include <string>

class GameStatusMessage : public Message
{
private:
    int _gameId;
public:
    GameStatusMessage(int gameId);
    std::string accept (MessageVisitor* visitor, Session* session);
    
    int gameId() { return _gameId; }
};

#endif
