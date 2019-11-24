#include <sstream>
#include <iostream>
#include "MessageFactory.h"
#include "MessageVisitor.h"
#include "../exceptions/WrongInputException.h"

#include "Parser.h"

class PrintMessage : public MessageVisitor {
public:
    void visitReg (RegMessage* message) {
        std::cout << message->user() << message->pass() << std::endl;
    }
    void visitListGames (ListGamesMessage* message) {
        std::cout << message->user() << message->pass() << message->gameId() << std::endl;
    }
    void visitGameMove (GameMoveMessage* message) {
        std::cout << message->user() << message->pass() << message->gameId() 
                  << message->x1()
                  << message->y1()
                  << message->x2()
                  << message->y2()
                  << std::endl;
    }
    void visitGameStatus (GameStatusMessage* message) {
        std::cout << message->user() << message->pass() << message->gameId() << std::endl;
    }
    void visitGameDrop (GameDropMessage* message) {
        std::cout << message->user() << message->pass() << message->gameId() << std::endl;
    }
    void visitGameLastTurn (GameLastTurnMessage* message) {
        std::cout << message->user() << message->pass() << message->gameId() << std::endl;
    }
    void visitGameLastMove (GameLastMoveMessage* message) {
        std::cout << message->user() << message->pass() << message->gameId() << std::endl;
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
