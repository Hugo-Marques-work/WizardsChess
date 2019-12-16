#ifndef _PIECE_H_
#define _PIECE_H_
#include "../Position.h"
#include <list>
#include <utility>

class ChessMatrix;
class Game;

class Piece
{
protected:
    Game* _game;

    bool _forward;
    int _id;
    bool _white;
    bool _alive = true;
    Position _myPos;
public:
    Piece(): _id(0), _white(true), _myPos(Position(0,0)), 
        _game(nullptr), _forward(true) {}
        
    Piece(int id, bool white, Position pos, Game* g, bool forward): 
        _id(id), _white(white), _myPos(pos), _game(g), _forward(forward) {}
    
    virtual std::list<Position> getValidMoves() = 0;
    virtual ~Piece() {}

    bool validateMove(Position dst);

    inline bool isWhite() { return _white; }

    void set(int id, bool white, Position pos, Game* m, bool forward)
    {
        _id = id;
        _white = white;
        _myPos = pos;
        _game = m;
        _forward = forward;
    }

    inline int getId() { return _id; }
    
    inline Position& getPos() { return _myPos; }
    
    virtual void setPos(const Position& pos) { _myPos = pos; } 

    virtual void die() { _alive = false;}

    bool getAlive() { return _alive; }
    //Used for a text simulation of the game
    inline virtual void debugPrint() {}
};
#endif
