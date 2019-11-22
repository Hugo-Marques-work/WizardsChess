#ifndef GAME_H
#define GAME_H

#include "gamestates/GameState.h"
#include "ChessMatrix.h"


#include "pieces/Piece.h"
#include "pieces/PawnPiece.h"
#include "pieces/QueenPiece.h"
#include "pieces/KnightPiece.h"
#include "pieces/KingPiece.h"
#include "pieces/RookPiece.h"
#include "pieces/BishopPiece.h"
 
/*class Piece;
class BishopPiece;
class PawnPiece;
class KingPiece;
class QueenPiece;
class RookPiece;
class KnightPiece;*/
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
    std::list<QueenPiece> _queenW, _queenB;
    
    std::list<PawnPiece> _pawnW, _pawnB;
    std::list<RookPiece> _rookW, _rookB;
    std::list<KnightPiece> _knightW, _knightB;
    std::list<BishopPiece> _bishopW, _bishopB;
    
    std::list<std::list<Piece*> > _drawCondition;
public:
    Game(int gameId);
    void move(const Position& origin, const Position& dest);
    ChessMatrix* getMatrix () { return &_chessMatrix; }
    bool getTurn() { return _whiteTurn; }
    void boardCreation();
 
    Piece* getCell(const Position& pos)
    {
        return _chessMatrix.get(pos);
    }

    void fillEnPassant(const Position& lastPos,Piece* piece);
    
    std::list<Position>& getEnPassantOrigin() 
    { return _chessMatrix.getEnPassantOrigin(); }

    Position* getEnPassantDest() 
    { return _chessMatrix.getEnPassantDest(); }

    Piece* getEnPassantPiece() 
    { return _chessMatrix.getEnPassantPiece(); }

    void setState(GameState* state) { _state = state; }

    void createDrawConditions();

    std::list<std::list<Piece*> > getDrawConditions()
    {
        return _drawCondition;
    }
    std::list<BishopPiece>& getBishop(bool white)
    {
        if(white) {return _bishopW;} else {return _bishopB;}
    } 
    std::list<KnightPiece>& getKnight(bool white)
    {
        if(white) {return _knightW;} else {return _knightB;}
    }
    std::list<RookPiece>& getRook(bool white)
    {
        if(white) {return _rookW;} else {return _rookB;}
    }
    std::list<PawnPiece>& getPawn(bool white)
    {
        if(white) {return _pawnW;} else {return _pawnB;}
    }
    std::list<QueenPiece>& getQueen(bool white)
    {
        if(white) {return _queenW;} else {return _queenB;}
    }
    KingPiece& getKing(bool white)
    {
        if(white) {return _kingW;} else {return _kingB;}
    }
 

    void printMatrix();
};

#endif
