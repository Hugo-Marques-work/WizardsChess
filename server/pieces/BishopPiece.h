#ifndef _BISHOP_PIECE_
#define _BISHOP_PIECE_

#include "Piece.h"
#include <list>

#include <iostream>

class BishopPiece : public Piece
{
public:
    using Piece::Piece;
        
    std::list<Position> getValidMoves() override;

    void debugPrint() override { std::cout << "B"; }
};

#endif
