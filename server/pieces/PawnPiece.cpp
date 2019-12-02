#include "PawnPiece.h"
#include "../Game.h"
#include "../exceptions/PawnPromotionException.h"

std::list<Position> PawnPiece::getValidMoves()
{
    //InFrontOfMe
    std::cout << _myPos.x << " " << _myPos.y <<std::endl;
    int yToAdd = 1;
    if(_forward==false)
        yToAdd = -1;
    Piece* piece;
    std::list<Position> valid = std::list<Position>();
    try
    {
        piece = _game->getCell( Position(_myPos.x, _myPos.y+yToAdd) ); 
        if( piece == nullptr)
        {
            valid.push_front( Position(_myPos.x, _myPos.y+yToAdd) );
            if( _hasMoved == false)
            {
                //Double Foward in case of first move
                piece = _game->getCell( Position(_myPos.x, _myPos.y+yToAdd*2));

                if(piece == nullptr)
                {
                    valid.push_front( Position(_myPos.x, _myPos.y+yToAdd*2) );
                }
            }
        }
    }catch(std::out_of_range &e) 
    {
        return valid;
    }
    
    //DiagonalRight
    try
    {
        piece = _game->getCell( Position(_myPos.x+1, _myPos.y+yToAdd) ); 
        if( piece != nullptr && piece->isWhite() != _white)
            valid.push_front(Position(_myPos.x+1, _myPos.y+yToAdd));
    }catch(std::out_of_range &e) {;}
    //DiagonalLeft
    try
    {
        piece = _game->getCell( Position(_myPos.x-1, _myPos.y+yToAdd) ); 
        if( piece != nullptr && piece->isWhite() != _white)
            valid.push_front(Position(_myPos.x-1, _myPos.y+yToAdd));
    }catch(std::out_of_range &e){;}
    
    return valid;
}

void PawnPiece::setPos(const Position& pos)
{
    if(!_hasMoved)
    {
        Position lastPos = _myPos;
        Piece::setPos(pos);
        if(lastPos.y - _myPos.y == 2 || lastPos.y - _myPos.y == -2)
        {
            if(lastPos.y -_myPos.y == 2)
                lastPos.y--;
            else
                lastPos.y++;
            _game->fillEnPassant(lastPos,this);
        }
    }
    else
        Piece::setPos(pos); 
    _hasMoved = true;
    if(_myPos.y == MIN_POX_Y || _myPos.y == MAX_POS_Y)
    {
        throw PawnPromotionException(this);
    }
}