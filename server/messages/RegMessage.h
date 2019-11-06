#ifndef REGMESSAGE_H
#define REGMESSAGE_H

#include "Message.h"

class RegMessage : public Message
{
private:
public:
    void accept (MessageVisitor* visitor);
};

#endif
