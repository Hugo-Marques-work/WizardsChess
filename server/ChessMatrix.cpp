#include <iostream>
#include "ChessMatrix.h"
#include "pieces/PawnPiece.h"
#include "pieces/RookPiece.h"
#include "pieces/QueenPiece.h"
#include "pieces/KingPiece.h"
#include "pieces/KnightPiece.h"
#include "pieces/BishopPiece.h"

using namespace std;

void ChessMatrix::oneSideBoardCreation(bool white,bool forward)
{

}

void ChessMatrix::clearEnPassant()
{
    if(_enPassantOrigin.empty() && _enPassantDest==nullptr) return;
    _enPassantOrigin.clear();
    _enPassantDest = nullptr;
    _enPassantPiece = nullptr;
}

void ChessMatrix::tickTurn()
{
    _enPassantLiveTime--;
    if(_enPassantLiveTime<0)
        clearEnPassant();
}

void ChessMatrix::setEnPassant(Piece* piece, const std::list<Position>& p, const Position& origin)
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

ChessMatrix::ChessMatrix()
{ 
    _pieces = array< array<Piece*,8>, 8>();
    _enPassantPiece = nullptr;
    _enPassantDest = nullptr;
}

//Has some std::couts to help with text simulation
void ChessMatrix::set(const Position& pos, Piece* p)
{
    _pieces.at(pos.x).at(pos.y) = p;
}
