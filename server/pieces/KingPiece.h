#ifndef _KING_PIECE_
#define _KING_PIECE_

#include "Piece.h"
#include <list>

#include <iostream>
class KingPiece : public Piece
{
private:
    bool _hasMoved = false;
public:
    using Piece::Piece;
       
    std::list<Position> getValidMoves() override; 
    std::list<Position> getValidCastling(); 

    bool validateCastling(const Position& dst);
    Piece* getCastlingRook(const Position& dest);

    void setPos(const Position& pos) override 
    { Piece::setPos(pos); _hasMoved = true; } 

    void debugPrint() override { std::cout << "K"; }
};
 
#endif