#ifndef GAME_H
#define GAME_H

class Game
{
private:
    int _gameId;
    bool _whiteTurn;
    ChessMatrix _matrix;
public:
    Game(int gameId);
    void move(const std::pair<int, int>& origin, const std::pair<int, int>& dest);
    ChessMatrix* getMatrix () { return &_matrix; }
};

#endif
