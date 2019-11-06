#ifndef _INVALID_MOVE_EXCEPTION_
#define _INVALID_MOVE_EXCEPTION_

#include <exception>

class InvalidMoveException : public std::exception 
{
    virtual const char* what() const throw()
    {
        return "Invalid Move Exception";
    }
};

#endif