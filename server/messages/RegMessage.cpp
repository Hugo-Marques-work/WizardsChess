#include "RegMessage.h"

void RegMessage::accept (MessageVisitor* visitor) 
{
    visitor->visitReg(this);
}
