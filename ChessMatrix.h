#ifndef CHESSMATRIX_H
#define CHESSMATRIX_H

class ChessMatrix
{
private:
    static const int HEIGHT = 8, WIDTH = 8; 
    Piece* _matrix [HEIGHT][WIDTH];
public:
    ChessMatrix();
    void set();
    Piece* get();
};

#endif
