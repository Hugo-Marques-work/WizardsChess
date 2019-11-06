#include "RegMessage.h"
#include "MessageVisitor.h"

void RegMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitReg(this);
}
