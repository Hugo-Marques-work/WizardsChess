#ifndef LISTGANMESMESSAGE_H
#define LISTGANMESMESSAGE_H

#include "Message.h"
#include <string>

class ListGamesMessage : public Message
{
private:
public:
    ListGamesMessage ();
    
    std::string accept (MessageVisitor* visitor, Session* session);
};

#endif
