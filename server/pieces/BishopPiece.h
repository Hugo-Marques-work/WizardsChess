#ifndef _BISHOP_PIECE_
#define _BISHOP_PIECE_

#include "Piece.h"
#include <list>
class BishopPiece : Piece
{
public:
    BishopPiece(int id, bool white, Position pos, ChessMatrix* m,
        bool forward): Piece(id,white,pos,m,forward) {}
        
    std::list<Position> getValidMoves() override;

    virtual void debugPrint() { std::cout << "B"; }
};

#endif