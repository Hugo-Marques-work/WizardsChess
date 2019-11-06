#ifndef _NOT_YOUR_TURN_EXCEPTION_
#define _NOT_YOUR_TURN_EXCEPTION_

#include <exception>

class NotYourTurnException : public std::exception 
{
    virtual const char* what() const throw()
    {
        return "Not Your Turn Exception";
    }
}; 

#endif