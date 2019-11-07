#ifndef PLAYINGSTATE_H
#define PLAYINGSTATE_H

#include "GameState.h"

class PlayingState : public GameState 
{
private:
public:
    void accept (GameStateVisitor* visitor) override;
    
    void move(bool white, const Position& origin,
        const Position& dest) noexcept(false) override;
};

#endif
 