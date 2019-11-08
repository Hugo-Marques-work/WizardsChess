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
    bool _forward;
    int _id;
    bool _white;
    bool _alive = true;
    Position _myPos;
public:
    Piece(): _id(0), _white(true), _myPos(Position(0,0)), 
        _matrix(nullptr), _forward(true) {}
        
    Piece(int id, bool white, Position pos, ChessMatrix* m, bool forward): 
        _id(id), _white(white), _myPos(pos), _matrix(m), _forward(forward) {}
    //list or array or forward_list
    virtual std::list<Position> getValidMoves() = 0;

    bool validateMove(Position dst);

    inline bool isWhite() { return _white; }

    //inline void setWhite(bool white) { _white = white; }

    //void setMatrix(ChessMatrix* m) { _matrix = m; }

    //void setForward(bool forward) { _forward = forward; }

    void set(int id, bool white, Position pos, ChessMatrix* m, bool forward)
    {
        _id = id;
        _white = white;
        _myPos = pos;
        _matrix = m;
        _forward = forward;
    }

    inline int getId() { return _id; }
    
    inline Position& getPos() { return _myPos; }
    
    virtual void setPos(const Position& pos) { _myPos = pos; } 

    void die() { _alive = false;}

    bool getAlive() { return _alive; }
    //Used for a text simulation of the game
    inline virtual void debugPrint() {}
};
#endif
