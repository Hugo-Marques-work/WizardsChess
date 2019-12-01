#ifndef PAWNPROMOTIONMESSAGE_H
#define PAWNPROMOTIONMESSAGE_H

#include "Message.h"
#include <string>
#include "../pieces/Piece.h"

class PawnPromotionMessage : public Message
{
private:
    std::string _user, _pass, _pieceType;
    int _gameId;
public:
    PawnPromotionMessage(const std::string& user, const std::string& pass, int gameId, const std::string& pieceType);
    std::string accept (MessageVisitor* visitor);
    
    const std::string& user() { return _user; }
    const std::string& pass() { return _pass; }
    const std::string& pieceType () {return _pieceType;}
    int gameId() { return _gameId; }
};

#endif
