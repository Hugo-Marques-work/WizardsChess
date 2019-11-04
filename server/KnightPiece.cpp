#include "Piece.h"
#include <list>
class KnightPiece : Piece
{
public:
    KnightPiece(int id, bool white, Pos pos, ChessMatrix* m,
        bool forward): Piece(id,white,pos,m,forward) {}
    virtual std::list<Pos> getValidMoves()
    {
        Piece* piece;
        std::list<Pos> valid = std::list<Pos>();
        int minY = 0;
        for(int x = -2; x <= 2; x++)
        {
            if(x==0) continue;
            if(x == -2 || x ==2) minY = -1;
            else if(x == -1 || x == 1) minY = -2;
            for(int y = minY; y <= 2; y+=2)
            {
                if(y==0) continue;
                try{
                    piece = _positions->get( Pos(_myPos.first+x, _myPos.second+y) ); 
                    if( piece == nullptr || (piece!=nullptr && piece->isWhite() != _white))
                        valid.push_front( Pos(_myPos.first+x, _myPos.second+y) );
                }catch(std::out_of_range &e)
                {
                    continue;
                }
            }
        }
        return valid;
    }
    virtual void debugPrint() { std::cout << "H"; }
};