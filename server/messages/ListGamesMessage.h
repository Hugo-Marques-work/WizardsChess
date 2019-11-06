#ifndef LISTGANMESMESSAGE_H
#define LISTGANMESMESSAGE_H

#include "Message.h"

class ListGamesMessage : public Message
{
private:
public:
    void accept (MessageVisitor* visitor);
};

#endif
