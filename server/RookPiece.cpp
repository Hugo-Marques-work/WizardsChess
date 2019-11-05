#include "Piece.h"
#include <list>
class RookPiece : Piece
{
    bool _hasMoved = false;
public:
    RookPiece(int id,bool white,Pos pos, ChessMatrix* m,
        bool forward): Piece(id,white,pos,m,forward) {}
    virtual std::list<Pos> getValidMoves()
    {
        Piece* piece;
        std::list<Pos> valid = std::list<Pos>();

        int tempX;
        int tempY;
        //Horizontal Movement
        for(int x = -1; x <= 1; x+=2)
        {
            tempX = x;
            do{
                try{
                    piece = _matrix->get( Pos(_myPos.first+tempX, _myPos.second) ); 
                    if( piece == nullptr || (piece!=nullptr && piece->isWhite() != _white))
                        valid.push_front( Pos(_myPos.first+tempX, _myPos.second) );
                    tempX+=x;
                }catch(std::out_of_range &e) { break; }
            }while(piece == nullptr);
        }

        //Vertical Movement
        for(int y = -1; y <= 1; y+=2)
        {
            tempY = y;
            do{
                try{
                    piece = _matrix->get( Pos(_myPos.first, _myPos.second + tempY) ); 
                    if( piece == nullptr || (piece!=nullptr && piece->isWhite() != _white))
                        valid.push_front( Pos(_myPos.first, _myPos.second + tempY) );
                    tempY+=y;
                }catch(std::out_of_range &e) { break; }
            }while(piece == nullptr);
        }
        return valid;
    }

    virtual void move() { _hasMoved = true; }
    virtual void debugPrint() { std::cout << "R"; }
};