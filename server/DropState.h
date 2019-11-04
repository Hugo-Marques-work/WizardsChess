#ifndef DROPSTATE_H
#define DROPSTATE_H

#include "GameState.h"

class DropState : public GameState 
{
private:
public:
    void accept (GameStateVisitor* visitor) = 0;
    void move(const std::pair<int, int>& origin, const std::pair<int, int>& dest);
};

#endif
