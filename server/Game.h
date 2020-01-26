#ifndef GAME_H
#define GAME_H

#include "pieces/Piece.h"
#include "pieces/PawnPiece.h"
#include "pieces/QueenPiece.h"
#include "pieces/KnightPiece.h"
#include "pieces/KingPiece.h"
#include "pieces/RookPiece.h"
#include "pieces/BishopPiece.h"

class Move;
class Player;
class GameState;
class PawnPromotionStrategy;
class ChessMatrix;

class Game
{
private:
    const int MAX_X = 8;
    const int MAX_Y = 8;
    Move* _lastMove;
    int _gameId;
    bool _whiteTurn;
    ChessMatrix* _chessMatrix;
    GameState* _state;
    Player *_playerW, *_playerB;
    
    KingPiece _kingW, _kingB;
    std::list<QueenPiece> _queenW, _queenB;
    
    std::list<PawnPiece> _pawnW, _pawnB;
    std::list<RookPiece> _rookW, _rookB;
    std::list<KnightPiece> _knightW, _knightB;
    std::list<BishopPiece> _bishopW, _bishopB;
    
    std::list<Piece*> _promoted;
    std::list<std::list<Piece*>> _drawCondition;
    
    void setLastMove (const Move& move);
public:
    Game(int gameId, Player* playerW, Player* playerB);
    ~Game();
    void move(const Position& origin, const Position& dest,
            const std::string& userId);
    
    Player* playerW () {return _playerW;}
    Player* playerB () {return _playerB;}
    
    int gameId () {return _gameId;}
    
    void promote(PawnPromotionStrategy* strategy);

    ChessMatrix* getMatrix () { return _chessMatrix; }
    bool getTurn() { return _whiteTurn; }
    const std::string& getTurnUser ();

    void boardCreation();
    void tickTurn();
    void fillEnPassant(const Position& lastPos,Piece* piece);
    
    std::list<Position>& getEnPassantOrigin();
    Position* getEnPassantDest();
    Piece* getEnPassantPiece();
    int getEnPassantLiveTime();
    Piece* getCell(const Position& pos);
    void setState(GameState* state) { _state = state; }
    GameState* getState () {return _state;}

    //FIXME DRAW CONDITIONS HAS BEEN DEPRECATED
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

    void removePawn(PawnPiece* p);
 
    std::list<BishopPiece>& insertBishop(bool white,BishopPiece& p)
    {
        if(white) {_bishopW.push_front(p);} else {_bishopB.push_front(p);}
    } 
    std::list<KnightPiece>& insertKnight(bool white,KnightPiece& p)
    {
        if(white) { _knightW.push_front(p);} else { _knightB.push_front(p);}
    }
    std::list<RookPiece>& insertRook(bool white,RookPiece& p)
    {
        if(white) { _rookW.push_front(p);} else { _rookB.push_front(p);}
    }
    std::list<PawnPiece>& insertPawn(bool white,PawnPiece& p)
    {
        if(white) { _pawnW.push_front(p);} else { _pawnB.push_front(p);}
    }
    std::list<QueenPiece>& insertQueen(bool white, QueenPiece& p)
    {
        if(white) { _queenW.push_front(p);} else { _queenB.push_front(p);}
    }
    
    //can't insert a king

    const Move& lastMove ();
    
    //true if the game can be deleted
    bool drop (const std::string& userId);
};

#endif
