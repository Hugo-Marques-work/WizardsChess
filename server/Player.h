#ifndef PLAYER_H
#define PLAYER_H

#include <string>
#include <map>
#include "Game.h"

class Player 
{
private:
    std::string _userId, _password;
    std::map<int, Game*> _games;
public:
    Player (const std::string& userId, const std::string& password);
    
    const std::string& user() {return _userId;}
    const std::string& pass () {return _password;}
    const std::map <int, Game*> & games () {return _games;}
    bool validatePassword (const std::string& guess);
    void addGame (Game* game);
};

#endif
