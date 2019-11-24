#ifndef _PAWN_PIECE_
#define _PAWN_PIECE_

#include "Piece.h"
#include <list>

#include <iostream>
class PawnPiece : public Piece
{
private:
    bool _hasMoved = false;
public:
    using Piece::Piece;
    
    std::list<Position> getValidMoves() override;

    void setPos(const Position& pos) override ;

    void debugPrint() override { std::cout << "P"; }
};

#endif