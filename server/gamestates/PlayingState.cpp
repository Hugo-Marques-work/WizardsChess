#include "PlayingState.h"

void PlayingState::accept (GameStateVisitor* visitor) 
{
    visitor->visitPlaying(this);
}

void PlayingState::move(const Position& origin, const Position& dest) 
{
    ChessMatrix* m = _game->getMatrix();
}
