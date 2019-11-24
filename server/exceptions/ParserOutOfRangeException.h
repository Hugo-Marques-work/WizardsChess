#ifndef PARSEROUTOFRNGEEXCEPTION_H
#define PARSEROUTOFRNGEEXCEPTION_H

#include "ParserException.h"

class ParserOutOfRangeException : public ParserException 
{
public:
    ParserOutOfRangeException() {}
    virtual const char* what () const throw () 
    {
        return "ParserOutOfRangeException";
    }
};

#endif
