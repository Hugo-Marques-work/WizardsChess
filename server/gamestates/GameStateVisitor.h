#ifndef GAMESTATEVISITOR_H
#define GAMESTATEVISITOR_H

#include <string>

class PlayingState;
class DrawState;
class WinState;
class DropState;
class WaitingForPromotionState;

class GameStateVisitor
{
public:
    virtual std::string visitPlaying (PlayingState* state) = 0;
    virtual std::string visitDraw (DrawState* state) = 0;
    virtual std::string visitWin (WinState* state) = 0;
    virtual std::string visitDrop (DropState* state) = 0;
    virtual std::string visitWaiting(WaitingForPromotionState* state) = 0;
};
 
#endif
