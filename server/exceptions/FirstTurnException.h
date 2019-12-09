#ifndef FIRSTTURNEXCEPTION_H
#define FIRSTTURNEXCEPTION_H

#include <exception>

class FirstTurnException : public std::exception 
{
    virtual const char* what() const throw()
    {
        return "First Turn Exception";
    }
}; 

#endif
