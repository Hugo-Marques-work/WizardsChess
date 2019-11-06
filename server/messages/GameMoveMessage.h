#ifndef GAMEMOVEMESSAGE_H
#define GAMEMOVEMESSAGE_H

#include "Message.h"

class GameMoveMessage : public Message
{
private:
public:
    void accept (MessageVisitor* visitor);
};

#endif
