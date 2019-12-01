#ifndef GAMESTATEVISITOR_H
#define GAMESTATEVISITOR_H

/*
#include "PlayingState.h"
#include "DrawState.h"
#include "WinState.h"
#include "DropState.h"*/

class PlayingState;
class DrawState;
class WinState;
class DropState;
class WaitingForPromotionState;
class GameStateVisitor
{
public:
    virtual void visitPlaying (PlayingState* state) = 0;
    virtual void visitDraw (DrawState* state) = 0;
    virtual void visitWin (WinState* state) = 0;
    virtual void visitDrop (DropState* state) = 0;
    virtual void visitWaiting(WaitingForPromotionState* state) = 0;
};
 
#endif
