#ifndef GAME_H
#define GAME_H

#include "GameState.h"
#include "ChessMatrix.h"
#include "pieces/Piece.h"
#include "pieces/PawnPiece.h"
#include "pieces/QueenPiece.h"
#include "pieces/KnightPiece.h"
#include "pieces/KingPiece.h"
#include "pieces/RookPiece.h"
#include "pieces/BishopPiece.h"

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
    std::array<RookPiece,2> _rookW, _rookB;
    std::array<KnightPiece,2> _knightW, _knightB;
    std::array<BishopPiece,2> _bishopW, _bishopB;
    
    std::list<std::list<Piece*> > drawCondition;
public:
    Game(int gameId);
    void move(bool white, const Position& origin, const Position& dest);
    ChessMatrix* getMatrix () { return &_chessMatrix; }
    bool getTurn() { return _whiteTurn; }
    void boardCreation();

    void createDrawConditions();

    std::list<std::list<Piece*> > getDrawConditions()
    {
        return _drawCondition;
    }
    std::array<BishopPiece,2>& getBishop(bool white)
    {
        if(white) {return _bishopW;} else {return _bishopB};
    }
    std::array<KnightPiece,2>& getKnight(bool white)
    {
        if(white) {return _knightW;} else {return _knightB};
    }
    std::array<RookPiece,2>& getRook(bool white)
    {
        if(white) {return _rookW;} else {return _rookB};
    }
    std::array<PawnPiece,2>& getPawn(bool white)
    {
        if(white) {return _pawnW;} else {return _pawnB};
    }
    QueenPiece& getQueen(bool white)
    {
        if(white) {return _queenW;} else {return _queenB};
    }
    KingPiece& getKing(bool white)
    {
        if(white) {return _kingW;} else {return _kingB};
    }
 
};

#endif
