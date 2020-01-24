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

    bool hasMoved() { return _hasMoved; }
    void debugPrint() override { std::cout << "R"; }
    
    std::string stringify() override {
        return Piece::stringify() + " " + std::to_string(_hasMoved);
    }
};

#endif