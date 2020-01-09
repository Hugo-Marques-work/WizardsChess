#include "Session.h"

void Session::login (const std::string& userName)
{
    _userName = userName;
    _logged = true;
}
