#include "../Game.h"
#include "../Player.h"
#include "DropState.h"
#include "WinState.h"
#include "../exceptions/NoSuchGameException.h"
#include "../exceptions/InvalidActionException.h"

std::string WinState::accept (GameStateVisitor* visitor) 
{
    return visitor->visitWin(this);
}

void WinState::move(const Position& origin, const Position& dest, const std::string& userId) 
{
    throw InvalidActionException();
}

bool WinState::drop (const std::string& userId)
{
    bool white;
    
    if (_game->playerW()->user() == userId)
        white = true;
    
    else if (_game->playerB()->user() == userId)
        white = false;
    
    else 
        throw NoSuchGameException ();
        
    _game->setState(new DropState (_game, white));
    
    delete this;
    
    return false;
}

void WinState::promote(PawnPromotionStrategy* strategy) 
{
    throw InvalidActionException(); 
}
