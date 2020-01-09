#ifndef NEWGAMEMESSAGE_H
#define NEWGAMEMESSAGE_H

#include "Message.h"
#include <string>

class NewGameMessage : public Message
{
private:
    std::string _user1, _user2; 
public:
    NewGameMessage (const std::string& user1, const std::string& user2);
    
    std::string accept (MessageVisitor* visitor, Session* session);
    
    const std::string& user1() { return _user1; }
    const std::string& user2() { return _user2; }
};

#endif
