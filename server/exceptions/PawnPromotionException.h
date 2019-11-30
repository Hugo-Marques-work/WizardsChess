#ifndef PARSEROUTOFRNGEEXCEPTION_H
#define PARSEROUTOFRNGEEXCEPTION_H

#include "PawnPromotionException.h"
#include "../pieces/PawnPiece.h"
#include <exception>

class PawnPromotionException : public std::exception 
{
private:
    PawnPiece* _pawn; 
public:
    PawnPromotionException(PawnPiece* p): _pawn(p) {}

    PawnPiece* getPawn() { return _pawn;}
    virtual const char* what () const throw () 
    {
        return "Pawn Promotion Exception";
    }
};

#endif
