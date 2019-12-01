#ifndef MESSAGE_H
#define MESSAGE_H

#include <string>

class MessageVisitor;

class Message 
{
private:
public:
    virtual std::string accept (MessageVisitor* visitor) = 0;
};

#endif
