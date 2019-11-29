#ifndef SERVER_H
#define SERVER_H

#include "Game.h"
#include <list>

class Server 
{
private:
    std::map<int, Game> _games;
public:
    Server ();
    
};

#endif
