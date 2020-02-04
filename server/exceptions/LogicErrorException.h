#ifndef LOGICERROREXCEPTION_H
#define LOGICERROREXCEPTION_H

#include <exception>
#include <string>

class LogicErrorException : public std::exception  
{
private:
    std::string _error;
public:
    LogicErrorException(const std::string& error) : _error(error) {}
    virtual const char* what() const throw()
    {
        return _error.data();
    }
};

#endif
