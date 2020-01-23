#ifndef SERVER_H
#define SERVER_H

#include "Game.h"
#include "Player.h"
#include "messages/MessageVisitor.h"
#include "messages/Message.h"
#include "messages/MessageFactory.h"
#include "Session.h"

#include <memory>
#include <list>
#include <map>

class Server : public MessageVisitor
{
private:
    std::map<int, Game*> _games;
    std::map<std::string, Player*> _players;
    std::map<int, Session*> _sessions;
    int _nextGameId;
    int _nextSession;
    MessageFactory _factory;
public:
    Server ();
    ~Server ();
    
    std::string visitReg (RegMessage* message, Session* session);
    std::string visitListGames (ListGamesMessage* message, Session* session);
    std::string visitGameMove (GameMoveMessage* message, Session* session);
    std::string visitGameStatus (GameStatusMessage* message, Session* session);
    std::string visitGameDrop (GameDropMessage* message, Session* session);
    std::string visitGameTurn (GameTurnMessage* message, Session* session);
    std::string visitGameLastMove (GameLastMoveMessage* message, Session* session);
    std::string visitPawnPromotion (PawnPromotionMessage* message, Session* session);
    std::string visitNewGame (NewGameMessage* message, Session* session);
    
    Player* searchPlayer (const std::string& user);
    void removeGame (int gameId);
    std::string process(const std::string& msg, int session);
    int createSession ();
    void closeSession (int session);
};

#endif
