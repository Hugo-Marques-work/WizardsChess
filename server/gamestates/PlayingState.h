#ifndef PLAYINGSTATE_H
#define PLAYINGSTATE_H

#include "GameState.h"

class PlayingState : public GameState 
{
private:    
    using GameState::GameState;

    int _currentPieces = 32;
    const int MAX_COUNTER = 50;
    int _moveCounter = 0;
    void checkVictory();
    void checkDraw();
    bool checkStalemate();
    bool checkSpecialCase();
    bool checkFiftyMove();
public:
    void accept (GameStateVisitor* visitor) override;
    
    void move(bool white, const Position& origin,
        const Position& dest) noexcept(false) override;
};

#endif
 