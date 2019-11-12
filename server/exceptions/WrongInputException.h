#ifndef WRONGINPUTEXCEPTION_H
#define WRONGINPUTEXCEPTION_H

#include <exception>
#include <string>

class WrongInputException : public std::exception 
{
private:
    std::string _what;
public:
    WrongInputException(const std::string & what) : _what(what){}
    virtual const char* what () const throw () 
    {
        return _what.data();
    }
};

#endif
