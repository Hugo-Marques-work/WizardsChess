#include "CheckGameVisitor.h"
#include "Game.h"
#include "Player.h"
#include "gamestates/WinState.h"

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
    Game* game = state->game();
    return "WIN_STATE " + (state->playerWhite() ? 
        game->playerW()->user() : game->playerB()->user());
}

std::string CheckGameVisitor::visitDrop (DropState* state)
{
    return "DROP_STATE";
}

std::string CheckGameVisitor::visitWaiting(WaitingForPromotionState* state)
{
    return "WAITING_FOR_PROMOTION_STATE";
}
