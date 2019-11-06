#ifndef _PIECE_H_
#define _PIECE_H_
#include "../ChessMatrix.h"
#include "../Position.h"
#include <list>
#include <utility>

class ChessMatrix;

class Piece
{
protected:
    ChessMatrix* _matrix; 
    const bool _forward;
    const int _id;
    const bool _white;
    Position _myPos;
public:
    Piece(int id, bool white, Position pos, ChessMatrix* m, bool forward): 
        _id(id), _white(white), _myPos(pos), _matrix(m), _forward(forward) {}
    //list or array or forward_list
    virtual std::list<Position> getValidMoves() = 0;

    bool validateMove(Position dst);

    inline virtual void move() { }

    inline bool isWhite() { return _white; }

    inline int getId() { return _id; }
    
    inline Position& getPos() { return _myPos; }
    
    inline void setPos(Position pos) { _myPos = pos; } 

    //Used for a text simulation of the game
    inline virtual void debugPrint() {}
};
#endif
