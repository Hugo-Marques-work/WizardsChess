#ifndef MESSAGEFACTORY_H
#define MESSAGEFACTORY_H

#include "Message.h"
#include "Parser.h"


class MessageFactory
{
private:
    Message* parseReg (Parser& parser);
    Message* parseListGames (Parser& parser);
    Message* parseGameMove (Parser& parser);
    Message* parseGameStatus (Parser& parser);
    Message* parseGameDrop (Parser& parser);
    Message* parseGameLastMove(Parser& parser);
    Message* parseGameLastTurn(Parser& parser);
public:
    //null terminated string
    Message* parse (const char* string);
};

#endif 
