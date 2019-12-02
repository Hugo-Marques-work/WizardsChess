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