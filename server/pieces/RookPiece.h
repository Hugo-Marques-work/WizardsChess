#ifndef _ROOK_PIECE_
#define _ROOK_PIECE_

#include "Piece.h"
#include <list>

#include <iostream>
class RookPiece : public Piece
{
    bool _hasMoved = false;
public:
    using Piece::Piece;

    std::list<Position> getValidMoves() override;

    void setPos(const Position& pos) override 
    { Piece::setPos(pos); _hasMoved = true; } 

    void debugPrint() override { std::cout << "R"; }
};

#endif