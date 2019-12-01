#ifndef _PAWN_PIECE_
#define _PAWN_PIECE_

#include "Piece.h"
#include <list>

#include <iostream>
class PawnPiece : public Piece
{
private:
    bool _hasMoved = false;
    const int MIN_POX_Y = 0;
    const int MAX_POS_Y = 7;
public:
    using Piece::Piece;
    
    std::list<Position> getValidMoves() override;

    void setPos(const Position& pos) override ;

    bool getForward() { return _forward; }

    void debugPrint() override { std::cout << "P"; }
};

#endif