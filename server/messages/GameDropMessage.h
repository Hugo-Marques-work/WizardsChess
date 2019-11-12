#ifndef GAMEDROPMESSAGE_H
#define GAMEDROPMESSAGE_H

#include "Message.h"
#include <string>

class GameDropMessage : public Message
{
private:
    std::string _user, _pass;
    int _gameId;
public:
    GameDropMessage(const std::string& user, const std::string& pass, int gameId);
    void accept (MessageVisitor* visitor);
    
    const std::string& user() { return _user; }
    const std::string& pass() { return _pass; }
    int gameId() { return _gameId; }
};

#endif
