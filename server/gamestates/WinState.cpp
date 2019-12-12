#include "WinState.h"

void WinState::accept (GameStateVisitor* visitor) 
{
    visitor->visitWin(this);
}

void WinState::move(const Position& origin, const Position& dest) 
{
    throw InvalidActionException();
}

bool WinState::drop (int gameId)
{
    _game->setState(new DroppedState (_game, gameId));
    delete this;
}
