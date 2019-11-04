#ifndef DRAWSTATE_H
#define DRAWSTATE_H

#include "GameState.h"

class DrawState : public GameState 
{
private:
public:
    void accept (GameStateVisitor* visitor) = 0;
    void move(const std::pair<int, int>& origin, const std::pair<int, int>& dest);
};

#endif
