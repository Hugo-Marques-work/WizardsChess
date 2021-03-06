#ifndef _KNIGHT_PIECE_
#define _KNIGHT_PIECE_

#include "Piece.h"

class KnightPiece : public Piece
{
public:
    using Piece::Piece;

    std::list<Position> getValidMoves() override;
};

#endif
