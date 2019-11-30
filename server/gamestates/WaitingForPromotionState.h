#ifndef WAITING_FOR_PROMOTION_STATE
#define WAITING_FOR_PROMOTION_STATE

#include "GameState.h"
#include "DrawState.h"
#include "WinState.h"
#include "DropState.h"
#include "PlayingState.h"

class WaitingForPromotionState : public GameState 
{
private:    
    PlayingState* _playingState;
    PawnPiece* _pawn;
public:
    WaitingForPromotionState(PlayingState* s,Game* game, PawnPiece* p): 
        _playingState(s), GameState(game), _pawn(p) {}

    void accept (GameStateVisitor* visitor) override
    {
        visitor->visitWaiting(this);
    }
 
    void promote(Piece* p) override;

    void move(const Position& origin,
        const Position& dest) noexcept(false) override
    {
        throw InvalidActionException();
    }
}; 

#endif
 