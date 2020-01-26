#ifndef _QUEEN_PIECE_
#define _QUEEN_PIECE_

#include "Piece.h"

class QueenPiece : public Piece
{
public:
    using Piece::Piece;

    std::list<Position> getValidMoves() override;
};

#endif
