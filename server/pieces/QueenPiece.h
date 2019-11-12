#ifndef _QUEEN_PIECE_
#define _QUEEN_PIECE_

#include "Piece.h"
#include <list>
class QueenPiece : public Piece
{
public:
    using Piece::Piece;

    std::list<Position> getValidMoves() override;
    
    void debugPrint() override { std::cout << "Q"; }
};

#endif