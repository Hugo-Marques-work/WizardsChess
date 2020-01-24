#ifndef IMPORTGAMEMESSAGE_H
#define IMPORTGAMEMESSAGE_H

#include "Message.h"
#include <string>

class ImportGameMessage : public Message
{
private:
    int _gameId;
public:
    ImportGameMessage(int gameId);
    std::string accept (MessageVisitor* visitor, Session* session);
    
    int gameId() { return _gameId; }
};

#endif
