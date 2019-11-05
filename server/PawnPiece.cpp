#include "Piece.h"

#include <list>
class PawnPiece : Piece
{
private:
    bool _hasMoved = false;
public:
    PawnPiece(int id,bool white, Pos pos, ChessMatrix* m,
         bool forward): Piece(id,white,pos,m,forward) {}
    
    virtual std::list<Pos> getValidMoves()
    {
        //InFrontOfMe
        int yToAdd = 1;
        if(_forward==false)
            yToAdd = -1;
        Piece* piece;
        std::list<Pos> valid = std::list<Pos>();
        try{
            piece = _matrix->get( Pos(_myPos.first, _myPos.second+yToAdd) ); 
            if( piece == nullptr)
            {
                valid.push_front( Pos(_myPos.first, _myPos.second+yToAdd) );
                if( _hasMoved == false)
                {
                    //Double Foward in case of first move
                    piece = _matrix->get( Pos(_myPos.first, _myPos.second+yToAdd*2));

                    if(piece == nullptr)
                        valid.push_front( Pos(_myPos.first, _myPos.second+yToAdd*2) );
                }
            }
        }catch(std::out_of_range &e) 
        {
            return valid;
            //donothing
        }
        
        //DiagonalRight
        try{
        piece = _matrix->get( Pos(_myPos.first+1, _myPos.second+yToAdd) ); 
        if( piece != nullptr && piece->isWhite() != _white)
            valid.push_front(Pos(_myPos.first+1, _myPos.second+yToAdd));
        }catch(std::out_of_range &e)
        {
            ;
        }
        //DiagonalLeft
        try{
        piece = _matrix->get( Pos(_myPos.first-1, _myPos.second+yToAdd) ); 
        if( piece != nullptr && piece->isWhite() != _white)
            valid.push_front(Pos(_myPos.first-1, _myPos.second+yToAdd));
        }catch(std::out_of_range &e)
        {
            ;
        }
        return valid;
    }

    virtual void move() { _hasMoved = true; }
    virtual void debugPrint() { std::cout << "P"; }
};