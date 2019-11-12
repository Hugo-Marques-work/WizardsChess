#ifndef MESSAGEFACTORY_H
#define MESSAGEFACTORY_H

#include "Message.h"
#include <sstream>

#include "RegMessage.h"
#include "ListGamesMessage.h"
#include "GameMoveMessage.h"
#include "GameStatusMessage.h"
#include "GameDropMessage.h"
#include "GameLastMoveMessage.h"
#include "GameLastTurnMessage.h"

class MessageFactory
{
private:
    Message* parseReg (std::stringstream& string);
    Message* parseListGames (std::stringstream& string);
    Message* parseGameMove (std::stringstream& string);
    Message* parseGameStatus (std::stringstream& string);
    Message* parseGameDrop (std::stringstream& string);
    Message* parseGameLastMove(std::stringstream& string);
    Message* parseGameLastTurn(std::stringstream& string);
public:
    //null terminated string
    Message* parse (const char* string);
};

#endif 
