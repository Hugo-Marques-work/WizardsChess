#include "RegMessage.h"
#include "MessageVisitor.h"

RegMessage::RegMessage (const std::string& user, const std::string& pass): _user(user), _pass(pass) 
{

}

std::string RegMessage::accept (MessageVisitor* visitor) 
{
    return visitor->visitReg(this);
}
