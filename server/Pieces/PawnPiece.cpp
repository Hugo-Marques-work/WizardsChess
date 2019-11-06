#include "PawnPiece.h"


std::list<Position> PawnPiece::getValidMoves()
{
    //InFrontOfMe
    int yToAdd = 1;
    if(_forward==false)
        yToAdd = -1;
    Piece* piece;
    std::list<Position> valid = std::list<Position>();
    try
    {
        piece = _matrix->get( Position(_myPos.x, _myPos.y+yToAdd) ); 
        if( piece == nullptr)
        {
            valid.push_front( Position(_myPos.x, _myPos.y+yToAdd) );
            if( _hasMoved == false)
            {
                //Double Foward in case of first move
                piece = _matrix->get( Position(_myPos.x, _myPos.y+yToAdd*2));

                if(piece == nullptr)
                    valid.push_front( Position(_myPos.x, _myPos.y+yToAdd*2) );
            }
        }
    }catch(std::out_of_range &e) 
    {
        return valid;
    }
    
    //DiagonalRight
    try
    {
        piece = _matrix->get( Position(_myPos.x+1, _myPos.y+yToAdd) ); 
        if( piece != nullptr && piece->isWhite() != _white)
            valid.push_front(Position(_myPos.x+1, _myPos.y+yToAdd));
    }catch(std::out_of_range &e) {;}
    //DiagonalLeft
    try
    {
        piece = _matrix->get( Position(_myPos.x-1, _myPos.y+yToAdd) ); 
        if( piece != nullptr && piece->isWhite() != _white)
            valid.push_front(Position(_myPos.x-1, _myPos.y+yToAdd));
    }catch(std::out_of_range &e){;}
    
    return valid;
}