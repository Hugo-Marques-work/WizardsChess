#ifndef _KING_PIECE_
#define _KING_PIECE_

#include "Piece.h"
#include <list>
class KingPiece : Piece
{
private:
    bool _hasMoved = false;
public:
    KingPiece(int id, bool white,Position pos, ChessMatrix* m,
        bool forward): Piece(id,white,pos,m,forward) {}
        
    std::list<Position> getValidMoves() override; 

    virtual void move() { _hasMoved = true; }

    virtual void debugPrint() { std::cout << "K"; }
};

#endif