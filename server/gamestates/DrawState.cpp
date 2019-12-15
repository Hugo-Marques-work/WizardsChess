#include "../Game.h"
#include "../Player.h"
#include "../exceptions/NoSuchGameException.h"
#include "../exceptions/InvalidActionException.h"
#include "DrawState.h"
#include "DropState.h"

std::string DrawState::accept (GameStateVisitor* visitor) 
{
    return visitor->visitDraw(this);
}

void DrawState::move(const Position& origin, const Position& dest, const std::string& userId) 
{
    throw InvalidActionException();
}

bool DrawState::drop (const std::string& userId)
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

void DrawState::promote(Piece* p) 
{
    throw InvalidActionException(); 
}
