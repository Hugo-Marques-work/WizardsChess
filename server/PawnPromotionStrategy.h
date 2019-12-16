#ifndef PAWNPROMOTIONSTRATEGY_H
#define PAWNPROMOTIONSTRATEGY_H

#include "pieces/Piece.h"
#include "pieces/QueenPiece.h"
#include "pieces/KnightPiece.h"
#include "pieces/BishopPiece.h"
#include "pieces/RookPiece.h"

class PawnPromotionStrategy 
{
public:
    virtual Piece* createPiece () = 0;
};

class PromoteToQueen : public PawnPromotionStrategy
{
    Piece* createPiece () {return new QueenPiece();}
};

class PromoteToKnight : public PawnPromotionStrategy
{
    Piece* createPiece () {return new KnightPiece();}
};

class PromoteToRook : public PawnPromotionStrategy
{
    Piece* createPiece () {return new RookPiece();}
};

class PromoteToBishop : public PawnPromotionStrategy
{
    Piece* createPiece () {return new BishopPiece();}
};

#endif
