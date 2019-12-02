#include "KingPiece.h"
#include "../Game.h"

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
                piece = _game->getCell( Position(_myPos.x+x, _myPos.y+y) ); 
                if( piece == NULL)
                    valid.push_front( Position(_myPos.x+x, _myPos.y+y) );
            }catch(std::out_of_range &e) { continue; }
        }
    }

    return valid;
}

std::list<Position> KingPiece::getValidCastling()
{ 
    Piece* piece;
    std::list<Position> valid;
    if(!_hasMoved)
    {
        std::list<RookPiece>& rooks = _game->getRook(_white);
        int howManyMoved = 0;
        for(RookPiece& p : rooks)
        {
            if(!p.hasMoved())
            {
                Position& rPos = p.getPos();
                int dx =_myPos.x - rPos.x < 0 ? 1 : -1;
                int x = _myPos.x + dx;
                int y = _myPos.y;

                while(x!=rPos.x)
                {
                    if(_game->getCell( Position(x,y) ) != nullptr)
                        break;
                    x+=dx;
                }
                if(x==rPos.x)
                {
                    valid.push_front( Position(_myPos.x+dx*2,y) );
                }
            }
        }
    }
    return valid;
} 

bool KingPiece::validateCastling(const Position& dst)
{
    for(Position& pos : getValidCastling() )
    {
        if(pos.x == dst.x && pos.y == dst.y) 
            return true;
    }
    return false;
}

Piece* KingPiece::getCastlingRook(const Position& dst)
{        
    if(validateCastling(dst)==false) return nullptr;
    if(dst.x == _myPos.x + 2)
    //FIXME
        return _game->getCell(Position(7,_myPos.y)); 
    else
        return _game->getCell(Position(0,_myPos.y));
}