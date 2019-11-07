#ifndef GAME_H
#define GAME_H

#include "GameState.h"
#include "ChessMatrix.h"
#include "pieces/Piece.h"
#include "pieces"

class Game
{
private:
    const int MAX_X = 8;
    const int MAX_Y = 8;
    int _gameId;
    bool _whiteTurn;
    ChessMatrix _chessMatrix;
    GameState* _state;

    KingPiece _kingW, _kingB;
    QueenPiece _queenW, _queenB;
    
    std::array<PawnPiece,8> _pawnW, _pawnB;
    std::array<RookPiece,2> _rookPieceW, _rookPieceB;
    std::array<KnightPiece,2> _knightW, _knightB;
    std::array<BishopPiece,2> _bishopW, _bishopB;
    
    std::list<std::list<Piece*> > drawCondition;
public:
    Game(int gameId);
    void move(const Position& origin, const Position& dest);
    ChessMatrix* getMatrix () { return &_chessMatrix; }
    bool getTurn() { return _whiteTurn; }
    void boardCreation(bool forward, bool white);

};

#endif
