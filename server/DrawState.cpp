#include "DrawState.h"

void DrawState::accept (GameStateVisitor* visitor) 
{
    visitor->visitDraw(this);
}

void DrawState::move(const std::pair<int, int>& origin, const std::pair<int, int>& dest) 
{
    
}
