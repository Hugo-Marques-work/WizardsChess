#include "NewGameMessage.h"
#include "MessageVisitor.h"

NewGameMessage::NewGameMessage(const std::string& user): 
    _user(user)
{
    
}

std::string NewGameMessage::accept (MessageVisitor* visitor, Session* session) 
{
    return visitor->visitNewGame(this, session);
}
