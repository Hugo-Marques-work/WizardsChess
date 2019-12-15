#ifndef PIECENOTYOURSEXCEPTION_H
#define PIECENOTYOURSEXCEPTION_H

#include <exception>

class PieceNotYoursException : public std::exception 
{
    virtual const char* what() const throw()
    {
        return "Piece Not Yours Exception";
    }
}; 

#endif
