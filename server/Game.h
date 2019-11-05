#ifndef GAME_H
#define GAME_H

#include "GameState.h"
#include ""
class Game
{
private:
    int _gameId;
    bool _whiteTurn;
    ChessMatrix _chessMatrix;
    GameState* _state;
public:
    Game(int gameId);
    void move(const std::pair<int, int>& origin, const std::pair<int, int>& dest);
    ChessMatrix* getMatrix () { return &_chessMatrix; }
};

#endif
