#ifndef SERVER_H
#define SERVER_H

#define ASIO_STANDALONE

#include "Session.h"
#include "Game.h"
#include "Player.h"
#include "messages/MessageVisitor.h"
#include "messages/Message.h"
#include "messages/MessageFactory.h"

#include <list>
#include <map>

#include <websocketpp/config/asio_no_tls.hpp>
#include <websocketpp/server.hpp>
#include <websocketpp/common/thread.hpp>

using websocketpp::connection_hdl;
using websocketpp::lib::placeholders::_1;
using websocketpp::lib::placeholders::_2;
using websocketpp::lib::bind;

using websocketpp::lib::thread;
using websocketpp::lib::mutex;
using websocketpp::lib::lock_guard;
using websocketpp::lib::unique_lock;
using websocketpp::lib::condition_variable;

typedef websocketpp::server<websocketpp::config::asio> websocketpp_server;

class Server : public MessageVisitor
{
private:
    std::map<int, Game*> _games;
    std::map<std::string, Player*> _players;
    std::map<connection_hdl, Session*> _sessions;
    websocketpp_server _server;
    int _nextGameId;
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
    
    void run (int port);
    void onOpen(connection_hdl hdl);
    void onClose(connection_hdl hdl);
    void onMessage(connection_hdl hdl, 
                    websocketpp_server::message_ptr msg);
};

#endif
