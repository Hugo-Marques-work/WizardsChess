#ifndef DRAWSTATE_H
#define DRAWSTATE_H

#include "GameState.h"

class DrawState : public GameState 
{
private:   
    using GameState::GameState;
public:
    void accept (GameStateVisitor* visitor) override;

    void move(bool white, const Position& origin,
        const Position& dest) noexcept(false) override;
};

#endif