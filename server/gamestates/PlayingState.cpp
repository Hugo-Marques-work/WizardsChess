#include "PlayingState.h"

void PlayingState::accept (GameStateVisitor* visitor) 
{
    visitor->visitPlaying(this);
}

void PlayingState::move(bool white, const Position& origin, const Position& dest) 
{
    if( white != _game->getTurn() )
    {
        throw NotYourTurnException();
    }
    ChessMatrix* m = _game->getMatrix();
    Piece* p = m->get(origin);

    if(p == nullptr)
    {
        throw NoSuchPieceException();
    }

    if(p->validateMove(dest)==true)
    {
        Piece* destP = m->get(dest);
        destP->die();
        m->set(dest, p);
        m->set(origin, nullptr);
        p->setPos(dest);
    }
    else 
    {
        throw InvalidMoveException();
    }
}
 