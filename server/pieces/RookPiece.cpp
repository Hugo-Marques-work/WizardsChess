#include "RookPiece.h"

std::list<Position> RookPiece::getValidMoves()
{
    Piece* piece;
    std::list<Position> valid = std::list<Position>();

    int tempX;
    int tempY;
    //Horizontal Movement
    for(int x = -1; x <= 1; x+=2)
    {
        tempX = x;
        do
        {
            try
            {
                piece = _game->getCell( Position(_myPos.x+tempX, _myPos.y) ); 
                if( piece == nullptr || (piece!=nullptr && piece->isWhite() != _white))
                    valid.push_front( Position(_myPos.x+tempX, _myPos.y) );
                tempX+=x;
            }catch(std::out_of_range &e) { break; }
        }while(piece == nullptr);
    }

    //Vertical Movement
    for(int y = -1; y <= 1; y+=2)
    {
        tempY = y;
        do
        {
            try
            {
                piece = _game->getCell( Position(_myPos.x, _myPos.y + tempY) ); 
                if( piece == nullptr || (piece!=nullptr && piece->isWhite() != _white))
                    valid.push_front( Position(_myPos.x, _myPos.y + tempY) );
                tempY+=y;
            }catch(std::out_of_range &e) { break; }
        }while(piece == nullptr);
    }
    return valid;
}