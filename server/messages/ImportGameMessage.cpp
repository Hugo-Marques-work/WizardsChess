#include "ImportGameMessage.h"
#include "MessageVisitor.h"

ImportGameMessage::ImportGameMessage(int gameId): 
    _gameId(gameId) 
{

}

std::string ImportGameMessage::accept (MessageVisitor* visitor, Session* session) 
{
    return visitor->visitImportGame(this, session);
}
