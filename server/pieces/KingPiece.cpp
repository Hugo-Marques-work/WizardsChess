#include "KingPiece.h"

std::list<Position> KingPiece::getValidMoves()
{
    Piece* piece;
        std::list<Position> valid;
        for(int x = -1; x <= 1; x++)
        {
            for(int y = -1; y <= 1; y++)
            {
                if(x==0 && y==0) continue;
                try
                {
                    piece = _matrix->get( Position(_myPos.x+x, _myPos.y+y) ); 
                    if( piece == NULL)
                        valid.push_front( Position(_myPos.x+x, _myPos.y+y) );
                }catch(std::out_of_range &e) { continue; }
            }
        }
        return valid;
}