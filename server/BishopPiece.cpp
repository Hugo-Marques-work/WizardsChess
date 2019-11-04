#include "Piece.h"
#include <list>
class BishopPiece : Piece
{
public:
    BishopPiece(int id, bool white, Pos pos, ChessMatrix* m,
        bool forward): Piece(id,white,pos,m,forward) {}
    virtual std::list<Pos> getValidMoves()
    {
        Piece* piece;
        std::list<Pos> valid = std::list<Pos>();
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
                    try{
                        piece = _positions->get( Pos(_myPos.first+tempX, _myPos.second+tempY) ); 
                        if( piece == nullptr || (piece!=nullptr && piece->isWhite() != _white))
                            valid.push_front( Pos(_myPos.first+tempX, _myPos.second+tempY) );
                        tempX+=x;
                        tempY+=y;
                    }catch(std::out_of_range &e) {break;}
                }while(piece == nullptr);
            }
        }
        return valid;
    }
    virtual void debugPrint() { std::cout << "B"; }
};