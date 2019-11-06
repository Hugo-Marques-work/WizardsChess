#include "DropState.h"

void DropState::accept (GameStateVisitor* visitor) 
{
    visitor->visitDrop(this);
}

void DropState::move(const Position& origin, const Position& dest) 
{
    throw InvalidActionException();
}

