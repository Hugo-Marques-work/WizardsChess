#ifndef _BISHOP_PIECE_
#define _BISHOP_PIECE_

#include "Piece.h"
#include <list>
class BishopPiece : public Piece
{
public:
        
    std::list<Position> getValidMoves() override;

    void debugPrint() override { std::cout << "B"; }
};

#endif