#include "DropState.h"

void DropState::accept (GameStateVisitor* visitor) 
{
    visitor->visitDrop(this);
}

void DropState::move(const std::pair<int, int>& origin, const std::pair<int, int>& dest) 
{
    
}

