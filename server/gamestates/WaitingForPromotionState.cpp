#include "WaitingForPromotionState.h"
#include "../Game.h"

void WaitingForPromotionState::promote(Piece* p)
{
    p->set(_pawn->getId(),_pawn->isWhite(),_pawn->getPos(),
        _game,_pawn->getForward());

    _game->setState(_playingState);
    _game->tickTurn();

    _game->getMatrix()->set(p->getPos() ,p);

    delete this;
}