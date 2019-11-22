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

/*
    if(!_hasMoved)
    {
        std::array<RookPiece,2>& rooks = _game->getRook(_white);
        if(! rooks[0].hasMoved() )
        {
            int x = -1;
            int y = 0;
            while(_myPos.x + x != rooks[0].getPos().x)
            {
                if(_game->getCell( Position(_myPos.x+x, _myPos.y+y)) != nullptr) break;
            }
            if(_myPos.x + x == rooks[0].getPos().x)
            {
                
            }
        }
    }*/
    return valid;
}