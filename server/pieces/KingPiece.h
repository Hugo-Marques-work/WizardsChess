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

    void setPos(const Position& pos) override 
    { Piece::setPos(pos); _hasMoved = true; } 

    void debugPrint() override { std::cout << "K"; }
};
 
#endif