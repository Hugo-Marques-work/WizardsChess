#ifndef _KNIGHT_PIECE_
#define _KNIGHT_PIECE_

#include "Piece.h"
#include <list>
class KnightPiece : Piece
{
public:
    KnightPiece(int id, bool white, Position pos, ChessMatrix* m,
        bool forward): Piece(id,white,pos,m,forward) {}
        
    std::list<Position> getValidMoves() override;

    virtual void debugPrint() { std::cout << "H"; }
};

#endif