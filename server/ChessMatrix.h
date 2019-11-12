#ifndef _CHESS_MATRIX_
#define _CHESS_MATRIX_

#include <utility>
#include <list>
#include <array>
#include "pieces/Piece.h"
#include "pieces/EnPassantePiece.h"
#include "Position.h"
#include <iostream>

#include "exceptions/NoSuchPieceException.h"
class Piece;
class ChessMatrix
{
private:
    const int MAX_X = 8;
    const int MAX_Y = 8;
    //FIXME: Hugo, por que usas MAX_X e MAX_Y, e depois 8 har-coded?
    //FIXME: É um workaround
    std::array< std::array<Piece*,8>, 8> _pieces;
    std::list<Position> _enPassant;
    Position* _enPassantOrigin;

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
        if(_enPassant.empty()) return;
        _enPassant = std::list<Position>();
    }
    void setEnPassant(std::list<Position>& p, Position& origin)
    {
        clearEnPassant();
        _enPassant = p;
        _enPassantOrigin = new Position(origin.x,origin.y);

    }

    std::list<Position> getPassantOrigin()
    {
        return _enPassant;
    }

    std::list<Position> getPassantOrigin()
    {
        return _enPassantOrigin;
    }
    //Used for a text simulation of the game
    void printMatrix();
};
#endif
