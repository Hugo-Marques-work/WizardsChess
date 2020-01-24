#include "Session.h"

Session::Session() 
{
    _logged = false;
}

void Session::login (const std::string& userName)
{
    _userName = userName;
    _logged = true;
}
