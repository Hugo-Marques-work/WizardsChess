#ifndef GAME_H
#define GAME_H

#include "GameState.h"
#include "ChessMatrix.h"

class Game
{
private:
    int _gameId;
    bool _whiteTurn;
    ChessMatrix _chessMatrix;
    GameState* _state;
public:
    Game(int gameId);
    void move(const Position& origin, const Position& dest);
    ChessMatrix* getMatrix () { return &_chessMatrix; }
    bool getTurn() { return _whiteTurn; }
};

#endif
