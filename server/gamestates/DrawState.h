#ifndef DRAWSTATE_H
#define DRAWSTATE_H

#include <string>
#include "PawnPromotionStrategy.h"
#include "GameState.h"

class DrawState : public GameState 
{
private:   
    using GameState::GameState;
public:
    std::string accept (GameStateVisitor* visitor) override;

    void move(const Position& origin,
        const Position& dest, const std::string& userId) noexcept(false) override;
        
    bool drop (const std::string& userId) override; 
    
    void promote(PawnPromotionStrategy* strategy);
};

#endif
