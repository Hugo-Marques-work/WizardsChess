#ifndef MESSAGEVISITOR_H
#define MESSAGEVISITOR_H

#include "RegMessage.h"
#include "ListGamesMessage.h"
#include "GameMoveMessage.h"
#include "GameStatusMessage.h"
#include "GameDropMessage.h"
#include "GameLastTurnMessage.h"
#include "GameLastMoveMessage.h"

class MessageVisitor
{
public:
    virtual void visitReg (RegMessage* message) = 0;
    virtual void visitListGames (ListGamesMessage* message) = 0;
    virtual void visitGameMove (GameMoveMessage* message) = 0;
    virtual void visitGameStatus (GameStatusMessage* message) = 0;
    virtual void visitGameDrop (GameDropMessage* message) = 0;
    virtual void visitGameLastTurn (GameLastTurnMessage* message) = 0;
    virtual void visitGameLastMove (GameLastMoveMessage* message) = 0;
};

#endif
