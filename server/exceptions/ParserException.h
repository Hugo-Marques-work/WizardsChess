#ifndef PARSEREXCEPTION_H
#define PARSEREXCEPTION_H

#include <exception>

class ParserException : public std::exception 
{
public:
    ParserException() {}
    virtual const char* what () const throw () = 0;
};

#endif
