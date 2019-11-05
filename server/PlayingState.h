#ifndef PLAYINGSTATE_H
#define PLAYINGSTATE_H

#include "GameState.h"

class PlayingState : public GameState 
{
private:
public:
    void accept (GameStateVisitor* visitor);
    void move(const std::pair<int, int>& origin, const std::pair<int, int>& dest);
};

#endif
