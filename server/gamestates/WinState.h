#ifndef WINSTATE_H
#define WINSTATE_H

#include "GameState.h"

class WinState : public GameState 
{
private:
    bool _playerWhite;
public:
    WinState(Game* game, bool white): GameState(game),  _playerWhite(white) {}

    void accept (GameStateVisitor* visitor) override;
    
    void move(const Position& origin,
        const Position& dest) noexcept(false) override;
};

#endif
