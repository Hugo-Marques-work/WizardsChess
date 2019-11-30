#ifndef SERVER_H
#define SERVER_H

#include "Game.h"
#include <list>
#include <map>

class Server 
{
private:
    std::map<int, Game> _games;
public:
    Server ();
    
};

#endif
