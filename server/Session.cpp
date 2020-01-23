#include "Session.h"

Session::Session() 
{
    
}

void Session::login (const std::string& userName)
{
    _userName = userName;
    _logged = true;
}
