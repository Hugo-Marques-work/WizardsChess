#ifndef _ROOK_PIECE_
#define _ROOK_PIECE_

#include "Piece.h"
#include <list>
class RookPiece : Piece
{
    bool _hasMoved = false;
public:
    RookPiece(int id,bool white,Position pos, ChessMatrix* m,
        bool forward): Piece(id,white,pos,m,forward) {}

    std::list<Position> getValidMoves() override;

    virtual void move() { _hasMoved = true; }

    virtual void debugPrint() { std::cout << "R"; }
};

#endif