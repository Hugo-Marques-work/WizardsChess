#ifndef DROPSTATE_H
#define DROPSTATE_H

#include "GameState.h"

class DropState : public GameState 
{
private:
    bool _playerWhite;
public:
    DropState(Game* game, bool white): GameState(game), _playerWhite(white) {}
    void accept (GameStateVisitor* visitor) override;

    void move(const Position& origin,
        const Position& dest) noexcept(false) override;
};

#endif
