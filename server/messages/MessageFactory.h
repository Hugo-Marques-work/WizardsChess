#ifndef MESSAGEFACTORY_H
#define MESSAGEFACTORY_H

#include "Message.h"
#include "Parser.h"

#include <string>

class MessageFactory
{
private:
    Message* parseReg (Parser& parser);
    Message* parseListGames (Parser& parser);
    Message* parseGameMove (Parser& parser);
    Message* parseGameStatus (Parser& parser);
    Message* parseGameDrop (Parser& parser);
    Message* parseGameLastMove(Parser& parser);
    Message* parseGameTurn(Parser& parser);
    Message* parsePawnPromotion(Parser& parser);
    Message* parseNewGame(Parser& parser);
public:
    //null terminated string
    Message* parse (const std::string& string);
};

#endif 
