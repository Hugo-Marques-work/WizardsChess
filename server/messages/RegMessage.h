#ifndef REGMESSAGE_H
#define REGMESSAGE_H

#include "Message.h"
#include <string>

class RegMessage : public Message
{
private:
    std::string _user, _pass;
public:
    RegMessage (const std::string& user, const std::string& pass);
    void accept (MessageVisitor* visitor);
    
    const std::string& user() { return _user; }
    const std::string& pass() { return _pass; }
};

#endif
