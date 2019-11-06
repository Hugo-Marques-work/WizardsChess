#ifndef MESSAGEFACTORY_H
#define MESSAGEFACTORY_H

#include "Message.h"

class MessageFactory
{
private:
    Message* parseReg (const char* string);
    Message* parseListGames (const char* string);
    Message* parseGameMove (const char* string);
    Message* parseGameStatus (const char* string);
    Message* parseGameDrop (const char* string);
    Message* parseGameLastMove(const char* string);
    Message* parseGameLastTurn(const char* string);
public:
    //null terminated string
    Message* parse (const char* string);
};

#endif 
