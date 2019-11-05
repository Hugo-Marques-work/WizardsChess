#ifndef _PIECE_H_
#define _PIECE_H_
#include "ChessMatrix.h"
#include <list>
#include <utility>
class ChessMatrix;
class Piece
{
protected:
    using Pos = std::pair<int,int>;
    ChessMatrix* _matrix; 
    const bool _forward;
    const int _id;
    const bool _white;
    Pos _myPos;
public:
    Piece(int id, bool white, Pos pos, ChessMatrix* m, bool forward): 
        _id(id), _white(white), _myPos(pos), _matrix(m), _forward(forward) {}
    //list or array or forward_list
    virtual std::list<Pos> getValidMoves() = 0;

    bool validateMove(Pos dst);

    inline virtual void move() { }

    inline bool isWhite() { return _white; }

    inline int getId() { return _id; }
    
    inline Pos& getPos() { return _myPos; }
    
    inline void setPos(Pos pos) { _myPos = pos; } 

    //Used for a text simulation of the game
    inline virtual void debugPrint() {}
};
#endif
