#include "WaitingForPromotionState.h"
#include "DropState.h"
#include "../Game.h"
#include "../Player.h"
#include "../exceptions/NoSuchGameException.h"
#include "../exceptions/InvalidActionException.h"
#include "../ChessMatrix.h"

void WaitingForPromotionState::promote(PawnPromotionStrategy* strategy)
{
    Piece* newPiece = strategy->createPiece();
    
    newPiece->set(_pawn->getId(),_pawn->isWhite(),_pawn->getPos(),
        _game,_pawn->getForward());

    _game->setState(_playingState);
    _game->tickTurn();

    _game->getMatrix()->set(newPiece->getPos() ,newPiece);

    delete this;
}

bool WaitingForPromotionState::drop (const std::string& userId)
{
    bool white;
    
    if (_game->playerW()->user() == userId)
        white = true;
    
    else if (_game->playerB()->user() == userId)
        white = false;
    
    else 
        throw NoSuchGameException ();
        
    _game->setState(new DropState (_game, white));
    
    delete _playingState;
    delete this;
    
    return false;
}
