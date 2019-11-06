#include "KnightPiece.h"

std::list<Position> KnightPiece::getValidMoves()
{
    Piece* piece;
    std::list<Position> valid = std::list<Position>();
    int minY = 0;
    for(int x = -2; x <= 2; x++)
    {
        if(x==0) continue;
        if(x == -2 || x ==2) minY = -1;
        else if(x == -1 || x == 1) minY = -2;
        for(int y = minY; y <= 2; y+=2)
        {
            if(y==0) continue;
            try
            {
                piece = _matrix->get( Position(_myPos.x+x, _myPos.y+y) ); 
                if( piece == nullptr || (piece!=nullptr && piece->isWhite() != _white))
                    valid.push_front( Position(_myPos.x+x, _myPos.y+y) );
            }catch(std::out_of_range &e)
            {
                continue;
            }
        }
    }
    return valid;
}