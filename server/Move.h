#ifndef MOVE_H
#define MOVE_H

#include "Position.h"

struct Move
{
    Position origin, destination;
    
    Move (const Position& first, const Position& second): origin(first), destination(second) {}

    bool operator==(const Move& other) const
    {
        return origin==other.origin && destination == other.destination;
    }
};
#endif
