#ifndef _KNIGHT_PIECE_
#define _KNIGHT_PIECE_

#include "Piece.h"
#include <list>

#include <iostream>
class KnightPiece : public Piece
{
public:
    using Piece::Piece;

    std::list<Position> getValidMoves() override;

    void debugPrint() override { std::cout << "H"; }
};

#endif