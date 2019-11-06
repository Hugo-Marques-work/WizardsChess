#ifndef GAMEDROPMESSAGE_H
#define GAMEDROPMESSAGE_H

#include "Message.h"

class GameDropMessage : public Message
{
private:
public:
    void accept (MessageVisitor* visitor);
};

#endif
