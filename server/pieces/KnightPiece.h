#ifndef _KNIGHT_PIECE_
#define _KNIGHT_PIECE_

#include "Piece.h"
#include <list>
class KnightPiece : Piece
{
public:
        
    std::list<Position> getValidMoves() override;

    void debugPrint() override { std::cout << "H"; }
};

#endif