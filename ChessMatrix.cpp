#include "ChessMatrix.h"

ChessMatrix::ChessMatrix()
{
    for (int l = 0; l < ChessMatrix::HEIGHT; l++)
        for (int c = 0; c < ChessMatrix::WIDTH; c++)
            _matrix [l][c] = nullptr;
}
