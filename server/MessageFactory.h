#ifndef MESSAGEFACTORY_H
#define MESSAGEFACTORY_H

#include "Message.h"
#include <string>

class MessageFactory
{
private:
    Message* parseReg (const char* string);
    Message* parseListGames (const char* string);
    Message* parseGameMove (const char* string);
    Message* parseGameStatus (const char* string);
    Message* parseGameDrop (const char* string);
public:
    //null terminated string
    Message* parse (const char* string);
};

#endif 
