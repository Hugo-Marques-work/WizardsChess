#include "GameDropMessage.h"
#include "MessageVisitor.h"

GameDropMessage::GameDropMessage(int gameId): 
    _gameId(gameId) 
{

}


std::string GameDropMessage::accept (MessageVisitor* visitor, Session* session) 
{
    return visitor->visitGameDrop(this, session);
}
