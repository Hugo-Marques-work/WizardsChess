#ifndef DROPSTATE_H
#define DROPSTATE_H

#include <string>

#include "PawnPromotionStrategy.h"
#include "GameState.h"

class DropState : public GameState 
{
private:
    bool _playerWhite;
public:
    DropState(Game* game, bool white): GameState(game), _playerWhite(white) {}
    std::string accept (GameStateVisitor* visitor) override;

    void move(const Position& origin,
        const Position& dest, const std::string& userId) noexcept(false) override;
        
    bool drop (const std::string& userId);
    
    void promote(PawnPromotionStrategy* strategy);
};

#endif
