#ifndef MESSAGEVISITOR_H
#define MESSAGEVISITOR_H

#include "RegMessage.h"
#include "GameListMessage.h"
#include "GameMoveMessage.h"

class MessageVisitor
{
public:
    virtual void visitReg (RegMessage* message) = 0;
    virtual void visitGameList (GameListMessage* message) = 0;
    virtual void visitGameMove (GameMoveMessage* message) = 0;
};

#endif
