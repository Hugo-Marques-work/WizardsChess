#ifndef MY_SESSION_H
#define MY_SESSION_H

#include <string>

class Session
{
private:
    std::string _userName;
    bool _logged;
    int _sessionId;
    
public:
    Session(int sessionId);
    
    int sessionId () {return _sessionId;}
    bool isLogged () {return _logged;}
    std::string userName () {return _userName;}
    
    void login (const std::string& userName);
};

#endif
