#ifndef CHECKGAMEVISITOR_H
#define CHECKGAMEVISITOR_H

#include "gamestates/GameStateVisitor.h"
#include <string>

class CheckGameVisitor: public GameStateVisitor
{
public:
    std::string visitPlaying (PlayingState* state);
    std::string visitDraw (DrawState* state);
    std::string visitWin (WinState* state);
    std::string visitDrop (DropState* state);
    std::string visitWaiting(WaitingForPromotionState* state);
};
 
#endif
