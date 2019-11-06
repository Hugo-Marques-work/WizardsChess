#ifndef MESSAGE_H
#define MESSAGE_H

#include "MessageVisitor.h"

class Message 
{
private:
public:
    virtual void accept (MessageVisitor* visitor) = 0;
};

#endif
