#ifndef _BISHOP_PIECE_
#define _BISHOP_PIECE_

#include "Piece.h"

class BishopPiece : public Piece
{
public:
    using Piece::Piece;
    std::list<Position> getValidMoves() override;
};

#endif
