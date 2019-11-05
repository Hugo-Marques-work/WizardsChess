#ifndef REGMESSAGE_H
#define REGMESSAGE_H

class RegMessage : public Message
{
private:
public:
    void accept (MessageVisitor* visitor);
};

#endif
