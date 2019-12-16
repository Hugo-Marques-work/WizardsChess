#include "../exceptions/NoSuchGameException.h"
#include "../exceptions/InvalidActionException.h"
#include "DropState.h"
#include "../Game.h"
#include "../Player.h"

std::string DropState::accept (GameStateVisitor* visitor) 
{
    return visitor->visitDrop(this);
}

void DropState::move(const Position& origin, const Position& dest, const std::string& userId) 
{
    throw InvalidActionException();
}

bool DropState::drop (const std::string& userId)
{
    if (_game->playerW()->user() == userId && !_playerWhite ||
        _game->playerB()->user() == userId &&  _playerWhite)
        return true;
    
    return false;
}

void DropState::promote(PawnPromotionStrategy* strategy) 
{
    throw InvalidActionException(); 
}
