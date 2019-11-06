#ifndef GAMESTATUSMESSAGE_H
#define GAMESTATUSMESSAGE_H

#include "GameStatusMessage.h"

class GameStatusMessage : public Message
{
private:
public:
    void accept (MessageVisitor* visitor);
};

#endif
