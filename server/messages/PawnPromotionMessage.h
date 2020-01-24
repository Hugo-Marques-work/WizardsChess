#ifndef PAWNPROMOTIONMESSAGE_H
#define PAWNPROMOTIONMESSAGE_H

#include "Message.h"
#include <string>

class PawnPromotionMessage : public Message
{
private:
    std::string _pieceType;
    int _gameId;
public:
    PawnPromotionMessage(int gameId, const std::string& pieceType);
    std::string accept (MessageVisitor* visitor, Session* session);
    
    const std::string& pieceType () {return _pieceType;}
    int gameId() { return _gameId; }
};

#endif
