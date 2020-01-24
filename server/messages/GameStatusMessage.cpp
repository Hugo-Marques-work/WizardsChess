#include "GameStatusMessage.h"
#include "MessageVisitor.h"

GameStatusMessage::GameStatusMessage(int gameId): 
    _gameId(gameId) 
{

}

std::string GameStatusMessage::accept (MessageVisitor* visitor, Session* session) 
{
    return visitor->visitGameStatus(this, session);
}
