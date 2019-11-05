#include "PlayingState.h"

void PlayingState::accept (GameStateVisitor* visitor) 
{
    visitor->visitPlaying(this);
}

void PlayingState::move(const std::pair<int, int>& origin, const std::pair<int, int>& dest) 
{
    
}
