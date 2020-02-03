#ifndef NEWGAMEMESSAGE_H
#define NEWGAMEMESSAGE_H

#include "Message.h"
#include <string>

class NewGameMessage : public Message
{
private:
    std::string _user, _color;
public:
    NewGameMessage (const std::string& user, const std::string& color);
    
    std::string accept (MessageVisitor* visitor, Session* session);
    
    const std::string& user() { return _user; }
    const std::string& color() { return _color; }
};

#endif
