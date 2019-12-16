#ifndef GAMESTATE_H
#define GAMESTATE_H

#include <string>

#include "../PawnPromotionStrategy.h"
#include "GameStateVisitor.h"
#include "../Position.h"
#include "../exceptions/InvalidActionException.h"
#include "../exceptions/InvalidMoveException.h"
#include "../exceptions/NotYourTurnException.h"
#include "../exceptions/NoSuchPieceException.h"
#include "../exceptions/ImpossibleBoardStateException.h"
#include "../exceptions/PawnPromotionException.h"

class Game;

class GameState 
{
protected:
    //FIXME
    const int MAX_X = 8;
    const int MAX_Y = 8;
    Game* _game;
public:
    GameState(Game* game): _game(game) {}

    virtual std::string accept (GameStateVisitor* visitor) noexcept(false) = 0 ;
    
    virtual void move(const Position& origin,
         const Position& dest, const std::string& userId) noexcept(false) = 0;
    
    virtual void promote(PawnPromotionStrategy* strategy) = 0;
    
    virtual bool drop (const std::string& userId) = 0;
};
 
#endif
