#include "Piece.h"
#include <list>
class KingPiece : Piece
{
private:
    bool _hasMoved = false;
public:
    KingPiece(int id, bool white,Pos pos, ChessMatrix* m,
        bool forward): Piece(id,white,pos,m,forward) {}
    virtual std::list<Pos> getValidMoves()
    {
        //FIXME: Hugo: funções deste tamanho não são declaradas no corpo da classe
        Piece* piece;
        std::list<Pos> valid = std::list<Pos>();
        //FIXME: Hugo: mas que raio de inicialização é esta? C++ nao é Java
        //std::list<Pos> valid; 
        //ou
        //std::list<Pos> valid (); 

        for(int x = -1; x <= 1; x++)
        {
            for(int y = -1; y <= 1; y++)
            {
                if(x==0 && y==0) continue;
                try{ //FIXME: HUGO mas que raio de estilo usas?
                    piece = _positions->get( Pos(_myPos.first+x, _myPos.second+y) ); 
                    if( piece == NULL)
                        valid.push_front( Pos(_myPos.first+x, _myPos.second+y) );
                }catch(std::out_of_range &e) { continue; }
            }
        }
        return valid;
    }

    virtual void move() { _hasMoved = true; }
    virtual void debugPrint() { std::cout << "K"; }
};
