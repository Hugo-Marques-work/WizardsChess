#include "CheckGameVisitor.h"

#include "gamestates/PlayingState.h"
#include "gamestates/DrawState.h"
#include "gamestates/WinState.h"
#include "gamestates/DropState.h"
#include "gamestates/WaitingForPromotionState.h"

std::string CheckGameVisitor::visitPlaying (PlayingState* state)
{
    return "PLAYING_STATE";
}

std::string CheckGameVisitor::visitDraw (DrawState* state)
{
    return "DRAW_STATE";
}

std::string CheckGameVisitor::visitWin (WinState* state)
{
    return "WIN_STATE";
}

std::string CheckGameVisitor::visitDrop (DropState* state)
{
    return "DROP_STATE";
}

std::string CheckGameVisitor::visitWaiting(WaitingForPromotionState* state)
{
    return "WAITING_FOR_PROMOTION_STATE";
}
