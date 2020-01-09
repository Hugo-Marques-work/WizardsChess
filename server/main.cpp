#include <iostream>
#include "messages/MessageFactory.h"
#include "messages/Message.h"
#include "Server.h"
#include "exceptions/WrongInputException.h"

int main () 
{
    Server server;
    
    server.run(8000);
       
    return 0;
}
