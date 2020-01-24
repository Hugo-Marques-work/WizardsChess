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
}

//Has some std::couts to help with text simulation
void ChessMatrix::set(const Position& pos, Piece* p)
{
    _pieces.at(pos.x).at(pos.y) = p;
}

//Optional
void ChessMatrix::printMatrix()
{
    //Text Simulation
    for(int y = -1; y < MAX_Y; y++)
    {
        if(y!=-1)std::cout << y << ":";
        else std::cout << " " << ":";
        for(int x = 0; x < MAX_X; x++)
        { 
            if(y==-1) std::cout << x;
            else if(_pieces.at(x).at(y)==nullptr) std::cout << "-";
            else _pieces.at(x).at(y)->debugPrint();
            std::cout << " ";
        }
        std::cout << endl;
    }
    //Text Simulation
    for(int y = -1; y < MAX_Y; y++)
    {
        if(y!=-1)std::cout << y << ":";
        else std::cout << " " << ":";
        for(int x = 0; x < MAX_X; x++)
        { 
            if(y==-1) std::cout << x;
            else if(_pieces.at(x).at(y)==nullptr) std::cout << "-";
            else std::cout << _pieces.at(x).at(y)->isWhite();
            std::cout << " ";
        }
        std::cout << endl;
    }
    /* POSSIBLE MOVEMENTS:
    for(int y = 0; y < MAX_Y; y++)
    {
        for(int x = 0; x < MAX_X; x++)
        {
            std::cout << "pos:" << x << "|" << y << std::endl<<std::flush;
            if(_pieces.at(x).at(y)==nullptr) continue;
            std::cout << "validMoves:"<<std::flush;
            for(Position p : (_pieces.at(x).at(y))->getValidMoves())
            {
                std::cout << "first" <<p.x <<"second" << p.y<<std::flush;
            }
            std::cout << endl;
        }
    }*/

}
