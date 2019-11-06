#ifndef DROPSTATE_H
#define DROPSTATE_H

#include "GameState.h"

class DropState : public GameState 
{
private:
    bool _playerWhite;
public:
    DropState(bool white): _playerWhite(white) {}
    void accept (GameStateVisitor* visitor) override;
    void move(const Position& origin, const Position& dest) override;
};

#endif
