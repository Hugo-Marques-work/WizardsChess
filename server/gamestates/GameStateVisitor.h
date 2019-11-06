#ifndef GAMESTATEVISITOR_H
#define GAMESTATEVISITOR_H

#include "PlayingState.h"
#include "DrawState.h"
#include "WinState.h"
#include "DropState.h"

class GameStateVisitor
{
public:
    void visitPlaying (PlayingState* state) = 0;
    void visitDraw (DrawState* state) = 0;
    void visitWin (WinState* state) = 0;
    void visitDrop (DropState* state) = 0;
};

#endif
