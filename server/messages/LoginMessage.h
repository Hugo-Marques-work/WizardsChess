#ifndef LOGINMESSAGE_H
#define LOGINMESSAGE_H

#include "Message.h"
#include <string>

class LoginMessage : public Message
{
private:
    std::string _user, _pass;
public:
    LoginMessage (const std::string& user, const std::string& pass);
    std::string accept (MessageVisitor* visitor, Session* session);
    
    const std::string& user() { return _user; }
    const std::string& pass() { return _pass; }
};

#endif
