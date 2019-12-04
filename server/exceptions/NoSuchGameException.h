#ifndef NOSUCHGAMEEXCEPTION_H
#define NOSUCHGAMEEXCEPTION_H

#include <exception>

class NoSuchGameException : public std::exception  
{
    virtual const char* what() const throw()
    {
        return "No Such Game Exception";
    }
};

#endif
