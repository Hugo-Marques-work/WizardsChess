#ifndef _KING_PIECE_
#define _KING_PIECE_

#include "Piece.h"

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
    
    std::string stringify() override {
        return Piece::stringify() + " " + std::to_string(_hasMoved);
    }
};
 
#endif
