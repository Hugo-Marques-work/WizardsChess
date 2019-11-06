#ifndef WINSTATE_H
#define WINSTATE_H

#include "GameState.h"

class WinState : public GameState 
{
private:
public:
    void accept (GameStateVisitor* visitor);
    void move(const std::pair<int, int>& origin, const std::pair<int, int>& dest);
};

#endif
