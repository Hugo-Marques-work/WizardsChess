#ifndef _INVALID_ACTION_EXCEPTION_
#define _INVALID_ACTION_EXCEPTION_

#include <exception>

class InvalidActionException : public std::exception  
{
    virtual const char* what() const throw()
    {
        return "Invalid Action Exception";
    }
};

#endif