#include "DrawState.h"

void DrawState::accept (GameStateVisitor* visitor) 
{
    visitor->visitDraw(this);
}

void DrawState::move(const Position& origin, const Position& dest) 
{
    throw InvalidActionException();
}
