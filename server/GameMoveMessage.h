#ifndef GAMEMOVEMESSAGE_H
#define GAMEMOVEMESSAGE_H

class GameMoveMessage : public Message
{
private:
public:
    void accept (MessageVisitor* visitor);
};

#endif
