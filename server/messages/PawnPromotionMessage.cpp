#include "PawnPromotionMessage.h"
#include "MessageVisitor.h"

PawnPromotionMessage::PawnPromotionMessage(const std::string& user, 
                const std::string& pass, int gameId, const std::string& pieceType) :
                _user(user), _pass(pass), _gameId(gameId), _pieceType(pieceType)
{
    
}

std::string PawnPromotionMessage::accept (MessageVisitor* visitor, Session* session) 
{
    visitor->visitPawnPromotion (this, session);
}
