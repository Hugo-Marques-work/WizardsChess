#ifndef MESSAGE_H
#define MESSAGE_H

class MessageVisitor;

class Message 
{
private:
public:
    virtual void accept (MessageVisitor* visitor) = 0;
};

#endif
