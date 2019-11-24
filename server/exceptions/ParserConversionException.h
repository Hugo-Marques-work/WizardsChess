#ifndef PARSERCONVERSIONEXCEPTION_H
#define PARSERCONVERSIONEXCEPTION_H

#include "ParserException.h"

class ParserConversionException : public ParserException
{
public:
    ParserConversionException() {}
    virtual const char* what () const throw () 
    {
        return "ParserConversionException";
    }
};

#endif
