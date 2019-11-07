#ifndef GAMESTATE_H
#define GAMESTATE_H

#include "GameStateVisitor.h"
#include "../Position.h"
#include "../exceptions/InvalidActionException.h"
#include "../exceptions/InvalidMoveException.h"
#include "../exceptions/NotYourTurnException.h"
#include "../exceptions/NoSuchPieceException.h"
#include "../Game.h"

class GameState 
{
protected:
    Game* _game;
public:
    GameState(Game* game): _game(game) {}

    virtual void accept (GameStateVisitor* visitor) noexcept(false) = 0 ;
    virtual void move(bool white, const Position& origin,
         const Position& dest) noexcept(false) = 0;
};
 
#endif
