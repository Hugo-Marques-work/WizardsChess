#include "GameTurnMessage.h"
#include "MessageVisitor.h"

GameTurnMessage::GameTurnMessage(int gameId): 
    _gameId(gameId) 
{

}

std::string GameTurnMessage::accept (MessageVisitor* visitor, Session* session) 
{
    return visitor->visitGameTurn(this, session);
}
