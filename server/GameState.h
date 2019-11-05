#ifndef GAMESTATE_H
#define GAMESTATE_H

#include "GameStateVisitor.h"
#include <>//FIXME ficheiro para std::pair

class GameState 
{
private:
public:
    virtual void accept (GameStateVisitor* visitor) = 0;
    virtual void move(const std::pair<int, int>& origin, const std::pair<int, int>& dest) = 0;
};

#endif
