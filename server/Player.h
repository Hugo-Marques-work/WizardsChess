#ifndef GAME_H
#define GAME_H

#include <string>

class Player 
{
private:
    std::string _userId, _password;
public:
    Player (const std::string& userId, const std::string& password);
    
    const std::string& getUserId () {return _userId;}
    const std::string& getPassword () {return _password;}
};

#endif
