#ifndef PAWNPROMOTIONSTRATEGY_H
#define PAWNPROMOTIONSTRATEGY_H

#include "pieces/Piece.h"
#include "pieces/Queen.h"
#include "pieces/Knight.h"
#include "pieces/Bishop.h"
#include "pieces/Rook.h"

class PawnPromotionStrategy 
{
public:
    virtual Piece* createPiece () = 0;
};

class PromoteToQueen : public PawnPromotionStrategy
{
    Piece* createPiece () {return new Queen();}
};

class PromoteToKnight : public PawnPromotionStrategy
{
    Piece* createPiece () {return new Knight();}
};

class PromoteToRook : public PawnPromotionStrategy
{
    Piece* createPiece () {return new Rook();}
};

class PromoteToBishop : public PawnPromotionStrategy
{
    Piece* createPiece () {return new Bishop();}
};

#endif
