#ifndef DRAWSTATE_H
#define DRAWSTATE_H

#include <string>

#include "GameState.h"

class DrawState : public GameState 
{
private:   
    using GameState::GameState;
public:
    std::string accept (GameStateVisitor* visitor) override;

    void move(const Position& origin,
        const Position& dest) noexcept(false) override;
        
    bool drop (const std::string& userId) override; 
    
    void promote(Piece* p);
};

#endif
