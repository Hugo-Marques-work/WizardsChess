#include "Session.h"

Session::Session(int sessionId) : _logged(false), _sessionId(sessionId)
{
}

void Session::login (const std::string& userName)
{
    _userName = userName;
    _logged = true;
}
