#ifndef _IMPOSSIBLE_BOARD_STATE_EXCEPTION_
#define _IMPOSSIBLE_BOARD_STATE_EXCEPTION_

#include <exception>
 
class ImpossibleBoardStateException : public std::exception  
{
    virtual const char* what() const throw()
    {
        return "Invalid Action Exception";
    }
};

#endif