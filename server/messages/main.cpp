#include <sstream>
#include <iostream>
#include "MessageFactory.h"
#include "MessageVisitor.h"
#include "../exceptions/WrongInputException.h"

#include "Parser.h"

class PrintMessage : public MessageVisitor {
public:
    std::string visitReg (RegMessage* message) {
        std::cout << message->user() << message->pass() << std::endl;
        return "";
    }
    std::string visitListGames (ListGamesMessage* message) {
        std::cout << message->user() << message->pass() << message->gameId() << std::endl;
        return "";
    }
    std::string visitGameMove (GameMoveMessage* message) {
        std::cout << message->user() << message->pass() << message->gameId() 
                  << message->x1()
                  << message->y1()
                  << message->x2()
                  << message->y2()
                  << std::endl;
        return "";
    }
    std::string visitGameStatus (GameStatusMessage* message) {
        std::cout << message->user() << message->pass() << message->gameId() << std::endl;
        return "";
    }
    std::string visitGameDrop (GameDropMessage* message) {
        std::cout << message->user() << message->pass() << message->gameId() << std::endl;
        return "";
    }
    std::string visitGameLastTurn (GameLastTurnMessage* message) {
        std::cout << message->user() << message->pass() << message->gameId() << std::endl;
        return "";
    }
    std::string visitGameLastMove (GameLastMoveMessage* message) {
        std::cout << message->user() << message->pass() << message->gameId() << std::endl;
        return "";
    }
};

int main () {
    MessageFactory factory;
    PrintMessage visitor;
    
    while (!std::cin.eof ()) {
        char buffer [100];
        std::cin.getline (buffer, 100, '\n');
        
        Message* message;
        try {
            message = factory.parse(buffer);
        } catch (WrongInputException& e) {
            std::cout << "ERR " << e.what() << std::endl;
            continue;
        }
        message->accept(&visitor);
        
        delete message;
    }
    return 0;
}
