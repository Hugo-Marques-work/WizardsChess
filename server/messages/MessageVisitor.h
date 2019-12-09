#ifndef MESSAGEVISITOR_H
#define MESSAGEVISITOR_H

#include <string>
#include "RegMessage.h"
#include "ListGamesMessage.h"
#include "GameMoveMessage.h"
#include "GameStatusMessage.h"
#include "GameDropMessage.h"
#include "GameTurnMessage.h"
#include "GameLastMoveMessage.h"
#include "PawnPromotionMessage.h"
#include "NewGameMessage.h"

class MessageVisitor
{
public:
    virtual std::string visitReg (RegMessage* message) = 0;
    virtual std::string visitListGames (ListGamesMessage* message) = 0;
    virtual std::string visitGameMove (GameMoveMessage* message) = 0;
    virtual std::string visitGameStatus (GameStatusMessage* message) = 0;
    virtual std::string visitGameDrop (GameDropMessage* message) = 0;
    virtual std::string visitGameTurn (GameTurnMessage* message) = 0;
    virtual std::string visitGameLastMove (GameLastMoveMessage* message) = 0;
    virtual std::string visitPawnPromotion (PawnPromotionMessage* message) = 0;
    virtual std::string visitNewGame (NewGameMessage* message) = 0;
};

#endif
