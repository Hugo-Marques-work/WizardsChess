#include <iostream>
#include "messages/MessageFactory.h"
#include "messages/Message.h"
#include "Server.h"

int main () {
    MessageFactory factory;
    Server server;
    Message *message;
    
    while (!std::cin.eof()) {
        char buffer [256];
        std::cin.getline (buffer, 256);
        try {
            message = factory.parse(buffer);
            std::cout << message->accept(&server) << std::endl;
            delete message;
        } catch (std::exception e) {
            std::cout << "ERR " << e.what() << std::endl;
        }
    }
}
