#ifndef _ROOK_PIECE_
#define _ROOK_PIECE_

#include "Piece.h"

class RookPiece : public Piece
{
    bool _hasMoved = false;
public:
    using Piece::Piece;

    std::list<Position> getValidMoves() override;

    void setPos(const Position& pos) override 
    { Piece::setPos(pos); _hasMoved = true; } 

    bool hasMoved() { return _hasMoved; }
    
    std::string stringify() override {
        return Piece::stringify() + " " + std::to_string(_hasMoved);
    }
};

#endif
