#ifndef INVALIDSESSIONEXCEPTION_H
#define INVALIDSESSIONEXCEPTION_H

#include <exception>

class InvalidSessionException : public std::exception  
{
public:
    virtual const char* what() const throw()
    {
        return "Invalid Session Exception";
    }
};

#endif
