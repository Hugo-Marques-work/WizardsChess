#ifndef _QUEEN_PIECE_
#define _QUEEN_PIECE_

#include "Piece.h"
#include <list>
class QueenPiece : Piece
{
public:
    QueenPiece(int id, bool white,Position pos, ChessMatrix* m,
        bool forward): Piece(id,white,pos,m,forward) {}

    std::list<Position> getValidMoves() override;
    
    virtual void debugPrint() { std::cout << "Q"; }
};

#endif