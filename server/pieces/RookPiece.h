#include "Piece.h"
#include <list>
class RookPiece : Piece
{
    bool _hasMoved = false;
public:
    RookPiece(int id,bool white,Position pos, ChessMatrix* m,
        bool forward): Piece(id,white,pos,m,forward) {}

    virtual std::list<Position> getValidMoves();

    virtual void move() { _hasMoved = true; }

    virtual void debugPrint() { std::cout << "R"; }
};