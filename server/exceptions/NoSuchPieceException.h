#ifndef _NO_SUCH_PIECE_EXCEPTION_
#define _NO_SUCH_PIECE_EXCEPTION_

#include <exception>

class NoSuchPieceException : public std::exception  
{
    virtual const char* what() const throw()
    {
        return "No Such Piece Exception";
    }
};

#endif