#ifndef DROPSTATE_H
#define DROPSTATE_H

#include <string>

#include "GameState.h"

class DropState : public GameState 
{
private:
    bool _playerWhite;
public:
    DropState(Game* game, bool white): GameState(game), _playerWhite(white) {}
    std::string accept (GameStateVisitor* visitor) override;

    void move(const Position& origin,
        const Position& dest) noexcept(false) override;
        
    bool drop (const std::string& userId);
    
    void promote(Piece* p);
};

#endif
