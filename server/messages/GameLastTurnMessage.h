#ifndef GAMELASTTURNMESSAGE_H
#define GAMELASTTURNMESSAGE_H

#include "Message.h"
#include <string>

class GameLastTurnMessage : public Message
{
private:
    std::string _user, _pass;
    int _gameId;
public:
    GameLastTurnMessage(const std::string& user, const std::string& pass, int gameId);
    std::string accept (MessageVisitor* visitor);
    
    const std::string& user() { return _user; }
    const std::string& pass() { return _pass; }
    int gameId() { return _gameId; }
};

#endif
