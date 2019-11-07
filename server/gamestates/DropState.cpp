#include "DropState.h"

void DropState::accept (GameStateVisitor* visitor) 
{
    visitor->visitDrop(this);
}

void DropState::move(bool white, const Position& origin, const Position& dest) 
{
    throw InvalidActionException();
}

