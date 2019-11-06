#ifndef GAMELASTMOVEMESSAGE_H
#define GAMELASTMOVEMESSAGE_H

#include "Message.h"

class GameLastMoveMessage : public Message
{
private:
public:
    void accept (MessageVisitor* visitor);
};

#endif
