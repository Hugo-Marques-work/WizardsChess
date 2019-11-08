#ifndef GAMESTATE_H
#define GAMESTATE_H

#include "GameStateVisitor.h"
#include "../Position.h"
#include "../exceptions/InvalidActionException.h"
#include "../exceptions/InvalidMoveException.h"
#include "../exceptions/NotYourTurnException.h"
#include "../exceptions/NoSuchPieceException.h"
#include "../exceptions/ImpossibleBoardStateException.h"
#include "../Game.h"

class GameState 
{
protected:
    //FIXME
    const int MAX_X = 8;
    const int MAX_Y = 8;
    Game* _game;
public:
    GameState(Game* game): _game(game) {}

    virtual void accept (GameStateVisitor* visitor) noexcept(false) = 0 ;
    virtual void move(bool white, const Position& origin,
         const Position& dest) noexcept(false) = 0;
};
 
#endif
