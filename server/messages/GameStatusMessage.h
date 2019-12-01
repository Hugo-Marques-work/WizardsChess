#ifndef GAMESTATUSMESSAGE_H
#define GAMESTATUSMESSAGE_H

#include "Message.h"
#include <string>

class GameStatusMessage : public Message
{
private:
    std::string _user, _pass;
    int _gameId;
public:
    GameStatusMessage(const std::string& user, const std::string& pass, int gameId);
    std::string accept (MessageVisitor* visitor);
    
    const std::string& user() { return _user; }
    const std::string& pass() { return _pass; }
    int gameId() { return _gameId; }
};

#endif
