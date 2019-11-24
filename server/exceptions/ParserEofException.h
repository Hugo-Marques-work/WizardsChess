#ifndef PARSEREOFEXCEPTION_H
#define PARSEREOFEXCEPTION_H

#include "ParserException.h"

class ParserEofException : public ParserException
{
public:
    ParserEofException(){}
    virtual const char* what () const throw () 
    {
        return "ParserEofException";
    }
};

#endif
