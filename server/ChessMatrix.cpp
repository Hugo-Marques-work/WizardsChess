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