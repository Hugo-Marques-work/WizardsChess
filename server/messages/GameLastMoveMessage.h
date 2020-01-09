#ifndef GAMELASTMOVEMESSAGE_H
#define GAMELASTMOVEMESSAGE_H

#include "Message.h"
#include <string>

class GameLastMoveMessage : public Message
{
private:
    std::string _user, _pass;
    int _gameId;
public:
    GameLastMoveMessage(const std::string& user, const std::string& pass, int gameId);
    std::string accept (MessageVisitor* visitor, Session* session);
    
    const std::string& user() { return _user; }
    const std::string& pass() { return _pass; }
    int gameId() { return _gameId; }
};

#endif
