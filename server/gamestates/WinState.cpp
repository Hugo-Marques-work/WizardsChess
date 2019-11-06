#include "WinState.h"

void WinState::accept (GameStateVisitor* visitor) 
{
    visitor->visitWin(this);
}

void WinState::move(const std::pair<int, int>& origin, const std::pair<int, int>& dest) 
{
    
}
