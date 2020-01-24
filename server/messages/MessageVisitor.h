#ifndef MESSAGEVISITOR_H
#define MESSAGEVISITOR_H

#include <string>

#include"../Session.h"
#include "RegMessage.h"
#include "ListGamesMessage.h"
#include "GameMoveMessage.h"
#include "GameStatusMessage.h"
#include "GameDropMessage.h"
#include "GameTurnMessage.h"
#include "GameLastMoveMessage.h"
#include "PawnPromotionMessage.h"
#include "NewGameMessage.h"
#include "LoginMessage.h"
#include "ImportGameMessage.h"

class MessageVisitor
{
public:
    virtual std::string visitReg (RegMessage* message, Session* session) = 0;
    virtual std::string visitListGames (ListGamesMessage* message, Session* session) = 0;
    virtual std::string visitGameMove (GameMoveMessage* message, Session* session) = 0;
    virtual std::string visitGameStatus (GameStatusMessage* message, Session* session) = 0;
    virtual std::string visitGameDrop (GameDropMessage* message, Session* session) = 0;
    virtual std::string visitGameTurn (GameTurnMessage* message, Session* session) = 0;
    virtual std::string visitGameLastMove (GameLastMoveMessage* message, Session* session) = 0;
    virtual std::string visitPawnPromotion (PawnPromotionMessage* message, Session* session) = 0;
    virtual std::string visitNewGame (NewGameMessage* message, Session* session) = 0;
    virtual std::string visitLogin (LoginMessage* message, Session* session) = 0;
    virtual std::string visitImportGame (ImportGameMessage* message, Session* session) = 0;
};

#endif
