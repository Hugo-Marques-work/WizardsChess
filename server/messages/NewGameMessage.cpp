#include "NewGameMessage.h"
#include "MessageVisitor.h"

NewGameMessage::NewGameMessage(const std::string& user1, const std::string& user2): 
    _user1(user1), _user2(user2)
{
    
}

std::string NewGameMessage::accept (MessageVisitor* visitor, Session* session) 
{
    return visitor->visitNewGame(this, session);
}
