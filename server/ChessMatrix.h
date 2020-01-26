#ifndef _CHESS_MATRIX_
#define _CHESS_MATRIX_

#include <utility>
#include <list>
#include <array>
#include "pieces/Piece.h"
#include "Position.h"
#include <iostream>

#include "exceptions/NoSuchPieceException.h"

//FIXME iostream
//FIXME throw out_of_range

class ChessMatrix
{
private:
    static const int MAX_X = 8;
    static const int MAX_Y = 8;
    std::array< std::array<Piece*,MAX_X>, MAX_Y> _pieces;
    
    std::list<Position> _enPassantOrigin;
    Position* _enPassantDest;
    Piece* _enPassantPiece; 
    int _enPassantLiveTime = 0;

    void oneSideBoardCreation(bool white, bool forward);
public:
    ChessMatrix();

    Piece* get(const Position& pos) noexcept(false) {
        return _pieces.at(pos.x).at(pos.y);
    }

    void set(const Position& pos, Piece* p) noexcept(false);
    void clearEnPassant();
    void setEnPassant(Piece* piece, const std::list<Position>& p, const Position& origin);
    void tickTurn();

    Piece* getEnPassantPiece() {return _enPassantPiece;}
    std::list<Position>& getEnPassantOrigin() {return _enPassantOrigin;}
    Position* getEnPassantDest(){return _enPassantDest;}
    int getEnPassantLiveTime() {return _enPassantLiveTime;}
};
#endif
