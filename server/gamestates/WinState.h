#ifndef WINSTATE_H
#define WINSTATE_H

#include <string>
#include "GameState.h"

class WinState : public GameState 
{
private:
    bool _playerWhite;
public:
    WinState(Game* game, bool white): GameState(game),  _playerWhite(white) {}

    std::string accept (GameStateVisitor* visitor) override;
    
    void move(const Position& origin,
        const Position& dest, const std::string& userId ) noexcept(false) override;
        
    bool drop (const std::string& userId);
    
    bool playerWhite() {return _playerWhite;}
    
    void promote(PawnPromotionStrategy* strategy);
};

#endif
