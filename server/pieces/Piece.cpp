#include "Piece.h"

bool Piece::validateMove(Position dst)
{
    for(Position& pos : getValidMoves() )
    {
        if(pos.x == dst.x && pos.y == dst.y) 
            return true;
    }
    return false;
}


std::string Piece::stringify() {
    return std::to_string(_id) + " " +
        std::to_string(_myPos.x) + " " + std::to_string(_myPos.y) + " " +
        std::to_string(_forward) + " " + std::to_string(_alive);
} 
