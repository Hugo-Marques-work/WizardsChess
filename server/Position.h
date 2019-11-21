#ifndef __POSITION_H__
#define __POSITION_H__
struct Position 
{
    int x;
    int y;

    Position(int first, int second): x(first), y(second) {}

    bool operator==(const Position& other) const
    {
        return x==other.x && y == other.y;
    }
};
#endif