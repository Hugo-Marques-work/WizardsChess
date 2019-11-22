#include "WinState.h"

void WinState::accept (GameStateVisitor* visitor) 
{
    visitor->visitWin(this);
}

void WinState::move(const Position& origin, const Position& dest) 
{
    throw InvalidActionException();
}
