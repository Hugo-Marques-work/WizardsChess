#ifndef PLAYINGSTATE_H
#define PLAYINGSTATE_H

#include <string>

#include "GameState.h"
#include "PawnPromotionStrategy.h"

class PlayingState : public GameState 
{
private:    
    using GameState::GameState;

    int _currentPieces = 32;
    const int MAX_COUNTER = 50;
    int _moveCounter = 0;
    
    bool checkVictory();
    bool checkDraw();
    bool checkStalemate();
    bool checkSpecialCase();
    bool checkFiftyMove();
    bool validateCheck(bool white);
public:
    std::string accept (GameStateVisitor* visitor) override;
    
    void move(const Position& origin,
        const Position& dest, const std::string& userId) noexcept(false) override;
        
    bool drop (const std::string& userId);
    
    void promote(PawnPromotionStrategy* strategy);
}; 

#endif
 
