#include "Piece.h"

bool Piece::validateMove(Pos dst)
{
    for(Pos pos : getValidMoves() )
    {
        if(pos.first == dst.first && pos.second == dst.second) 
            return true;
    }
    return false;
}