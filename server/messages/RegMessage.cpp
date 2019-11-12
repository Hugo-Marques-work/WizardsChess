#include "RegMessage.h"
#include "MessageVisitor.h"

RegMessage::RegMessage (const std::string& user, const std::string& pass): _user(user), _pass(pass) 
{

}

void RegMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitReg(this);
}
