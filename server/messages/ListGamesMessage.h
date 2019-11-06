#ifndef LISTGANMESMESSAGE_H
#define LISTGANMESMESSAGE_H

class ListGameseMessage : public Message
{
private:
public:
    void accept (MessageVisitor* visitor);
};

#endif
