#include "LoginMessage.h"
#include "MessageVisitor.h"

LoginMessage::LoginMessage (const std::string& user, const std::string& pass): _user(user), _pass(pass) 
{

}

std::string LoginMessage::accept (MessageVisitor* visitor, Session* session) 
{
    return visitor->visitLogin(this, session);
}
