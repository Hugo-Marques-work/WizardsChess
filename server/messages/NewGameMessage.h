#ifndef NEWGAMEMESSAGE_H
#define NEWGAMEMESSAGE_H

#include "Message.h"
#include <string>

class NewGameMessage : public Message
{
private:
    std::string _user; 
public:
    NewGameMessage (const std::string& user);
    
    std::string accept (MessageVisitor* visitor, Session* session);
    
    const std::string& user() { return _user; }
};

#endif
