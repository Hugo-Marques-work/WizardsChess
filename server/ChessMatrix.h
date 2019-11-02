#ifndef _CHESS_MATRIX_
#define _CHESS_MATRIX_

#include <utility>
#include <list>
#include <array>
#include "Piece.h"
#include <iostream>
class Piece;
class ChessMatrix
{
private:
    const int MAX_X = 8;
    const int MAX_Y = 8;
    std::array< std::array<Piece*,8>, 8> _pieces;
    void oneSideBoardCreation(bool white, bool forward);
public:
    ChessMatrix();
    inline Piece* get(std::pair<int,int> pos)
    {
        //Throw out_of_range    
        return _pieces.at(pos.first).at(pos.second);
    }

    void set(std::pair<int,int> pos, Piece* p);

    //Used for a text simulation of the game
    void printMatrix();
};

#endif