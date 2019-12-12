#ifndef SERVER_H
#define SERVER_H

#include <map>
#include "Game.h"
#include "Player.h"
#include "messages/MessageVisitor.h"
#include <list>
#include <map>

class Server : public MessageVisitor
{
private:
    std::map<int, Game*> _games;
    std::map<std::string, Player*> _players;
    int _nextGameId;
public:
    Server ();
    ~Server ();
    std::string visitReg (RegMessage* message);
    std::string visitListGames (ListGamesMessage* message);
    std::string visitGameMove (GameMoveMessage* message);
    std::string visitGameStatus (GameStatusMessage* message);
    std::string visitGameDrop (GameDropMessage* message);
    std::string visitGameTurn (GameTurnMessage* message);
    std::string visitGameLastMove (GameLastMoveMessage* message);
    std::string visitPawnPromotion (PawnPromotionMessage* message);
    std::string visitNewGame (NewGameMessage* message);
    Player* searchPlayer (const std::string& user);
    void removeGame (int gameId);
};

#endif
