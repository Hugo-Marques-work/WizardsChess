#include "PawnPromotionMessage.h"
#include "MessageVisitor.h"

PawnPromotionMessage::PawnPromotionMessage(int gameId, const std::string& pieceType) :
                _gameId(gameId), _pieceType(pieceType)
{
    
}

std::string PawnPromotionMessage::accept (MessageVisitor* visitor, Session* session) 
{
    visitor->visitPawnPromotion (this, session);
}
