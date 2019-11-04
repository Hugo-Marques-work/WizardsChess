#ifndef GAMESTATE_H
#define GAMESTATE_H

class GameState 
{
private:
public:
    virtual void accept (GameStateVisitor* visitor) = 0;
    virtual void move(const std::pair<int, int>& origin, const std::pair<int, int>& dest) = 0;
};

#endif
