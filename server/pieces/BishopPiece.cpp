#include "BishopPiece.h"

std::list<Position> BishopPiece::getValidMoves()
{
    Piece* piece;
    std::list<Position> valid = std::list<Position>();
    int tempX;
    int tempY;
    for(int x = -1; x <= 1; x+=2)
    {
        for(int y = -1; y <= 1; y+=2)
        {
            tempX = x;
            tempY = y;
            do
            {
                try
                {
                    piece = _game->getCell( Position(_myPos.x+tempX, _myPos.y+tempY) ); 
                    if( piece == nullptr || (piece!=nullptr && piece->isWhite() != _white))
                        valid.push_front( Position(_myPos.x+tempX, _myPos.y+tempY) );
                    tempX+=x;
                    tempY+=y;
                }catch(std::out_of_range &e) {break;}
            }while(piece == nullptr);
        }
    }
    return valid;
}