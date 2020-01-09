#ifndef LISTGANMESMESSAGE_H
#define LISTGANMESMESSAGE_H

#include "Message.h"
#include <string>

class ListGamesMessage : public Message
{
private:
    std::string _user, _pass;
public:
    ListGamesMessage (const std::string& user, const std::string& pass);
    
    std::string accept (MessageVisitor* visitor, Session* session);
    
    const std::string& user() { return _user; }
    const std::string& pass() { return _pass; }
};

#endif
