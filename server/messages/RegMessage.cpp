#include "RegMessage.h"
#include "MessageVisitor.h"

RegMessage::RegMessage (const std::string& user, const std::string& pass): _user(user), _pass(pass) 
{

}

std::string RegMessage::accept (MessageVisitor* visitor, Session* session) 
{
    return visitor->visitReg(this, session);
}
