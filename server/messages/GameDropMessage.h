#ifndef GAMEDROPMESSAGE_H
#define GAMEDROPMESSAGE_H

#include "Message.h"
#include <string>

class GameDropMessage : public Message
{
private:
    int _gameId;
public:
    GameDropMessage(int gameId);
    std::string accept (MessageVisitor* visitor, Session* session);
    
    int gameId() { return _gameId; }
};

#endif
