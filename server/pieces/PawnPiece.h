#ifndef _PAWN_PIECE_
#define _PAWN_PIECE_

#include "Piece.h"
#include <list>

class PawnPiece : public Piece
{
private:
    bool _hasMoved = false;
public:
    
    std::list<Position> getValidMoves() override;

    void setPos(const Position& pos) override 
    { Piece::setPos(pos); _hasMoved = true; } 

    void debugPrint() override { std::cout << "P"; }
};

#endif