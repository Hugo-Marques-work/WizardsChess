#ifndef GAMELASTTURNMESSAGE_H
#define GAMELASTTURNMESSAGE_H

#include "Message.h"

class GameLastTurnMessage : public Message
{
private:
public:
    void accept (MessageVisitor* visitor);
};

#endif
