#ifndef _CHESS_MATRIX_
#define _CHESS_MATRIX_

#include <utility>
#include <list>
#include <array>
#include "pieces/Piece.h"
#include "Position.h"
#include <iostream>

#include "exceptions/NoSuchPieceException.h"
//class Piece;

class ChessMatrix
{
private:
    const int MAX_X = 8;
    const int MAX_Y = 8;
    //FIXME: Hugo, por que usas MAX_X e MAX_Y, e depois 8 hard-coded?
    //FIXME: É um workaround
    std::array< std::array<Piece*,8>, 8> _pieces;
    
    std::list<Position> _enPassantOrigin;
    Position* _enPassantDest;
    Piece* _enPassantPiece; 
    int _enPassantLiveTime = 0;

    void oneSideBoardCreation(bool white, bool forward);
public:
    ChessMatrix();

    Piece* get(const Position& pos) noexcept(false)
    {
        //Throw out_of_range    
        return _pieces.at(pos.x).at(pos.y);
    }

    void set(const Position& pos, Piece* p) noexcept(false);

    void clearEnPassant()
    {
        if(_enPassantOrigin.empty() && _enPassantDest==nullptr) return;
        _enPassantOrigin.clear();
        _enPassantDest = nullptr;
        _enPassantPiece = nullptr;
    }

    void setEnPassant(Piece* piece, const std::list<Position>& p, const Position& origin)
    {
        clearEnPassant();
        for(const Position& pos : p)
        {
            _enPassantOrigin.emplace_front(pos);
        }
        _enPassantDest = new Position(origin.x,origin.y);
        _enPassantPiece = piece;
        _enPassantLiveTime = 2;
    }

    void tickTurn()
    {
        _enPassantLiveTime--;
        if(_enPassantLiveTime<0)
            clearEnPassant();
    }

    Piece* getEnPassantPiece()
    {
        return _enPassantPiece;
    }

    std::list<Position>& getEnPassantOrigin()
    {
        return _enPassantOrigin;
    }

    Position* getEnPassantDest()
    {
        return _enPassantDest;
    }
    //Used for a text simulation of the game
    void printMatrix();
};
#endif
