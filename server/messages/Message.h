#ifndef MESSAGE_H
#define MESSAGE_H

#include"../Session.h"

#include <string>

class MessageVisitor;

class Message 
{
private:
public:
    virtual std::string accept (MessageVisitor* visitor, Session* session) = 0;
};

#endif
