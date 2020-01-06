#define ASIO_STANDALONE

#include <websocketpp/config/asio_no_tls.hpp>
#include <websocketpp/server.hpp>
#include <websocketpp/common/thread.hpp>
#include <iostream>
#include <set>

using websocketpp::connection_hdl;
using websocketpp::lib::placeholders::_1; 
using websocketpp::lib::placeholders::_2;
using websocketpp::lib::bind;

using websocketpp::lib::thread;
using websocketpp::lib::mutex;
using websocketpp::lib::lock_guard;
using websocketpp::lib::unique_lock;
using websocketpp::lib::condition_variable;

websocketpp::server<websocketpp::config::asio> server;


void on_open(connection_hdl hdl) {
    std::cout << "on_open";
}

void on_close(connection_hdl hdl) {
    std::cout << "on_close";
}

void on_message(connection_hdl hdl, websocketpp::server<websocketpp::config::asio>::message_ptr msg) {
    std::cout << "on_message: received: " << msg->get_payload();
    //server.send(hdl, msg->get_payload(), msg->get_opcode());
    std::string s;
    std::getline(std::cin,s);
    std::cout << s;
    server.send(hdl,s,msg->get_opcode());
}

int main () {
    
    // Initialize Asio Transport
    server.init_asio();

    // Register handler callbacks
    server.set_open_handler(&on_open);
    server.set_close_handler(&on_close);
    server.set_message_handler(&on_message);    
    
    // listen on specified port
    server.listen(8001);

    // Start the server accept loop
    server.start_accept();

    // Start the ASIO io_service run loop
    try {
        server.run();
    } catch (const std::exception & e) {
        std::cout << e.what() << std::endl;
    }
}



/*

Exemplo:

LOGIN_A OK
LIST_GAMES_A OK 3 23 OLA W 45 ADEUS B 3333 OLDEUS B
(client does new game)
NEW_GAME_A OK
(client moves)
GAME_MOVE_A OK NEXT
 */