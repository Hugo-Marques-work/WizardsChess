#ifndef WINSTATE_H
#define WINSTATE_H

#include "GameState.h"

class WinState : public GameState 
{
private:
    bool _playerWhite;
public:
    WinState(bool white): _playerWhite(white) {}

    void accept (GameStateVisitor* visitor) override;
    
    void move(const Position& origin, const Position& dest) override;
};

#endif
