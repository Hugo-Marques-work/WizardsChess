#include "NewGameMessage.h"
#include "MessageVisitor.h"

NewGameMessage::NewGameMessage(const std::string& user, const std::string& color): 
    _user(user), _color(color)
{
    
}

std::string NewGameMessage::accept (MessageVisitor* visitor, Session* session) 
{
    return visitor->visitNewGame(this, session);
}
