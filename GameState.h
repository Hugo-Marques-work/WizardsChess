#ifndef GAMESTATE_H
#define GAMESTATE_H

class GameState 
{
private:
public:
    void accept (GameStateVisitor* visitor) = 0;
    void move() = 0;
};

#endif
