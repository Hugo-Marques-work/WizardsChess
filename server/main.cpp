#include <boost/beast/core.hpp>
#include <boost/beast/websocket.hpp>
#include <boost/asio/ip/tcp.hpp>
#include <cstdlib>
#include <functional>
#include <iostream>
#include <string>
#include <thread>
#include <mutex>

#include "exceptions/InvalidSessionException.h"
#include "Server.h"

using tcp = boost::asio::ip::tcp;               // from <boost/asio/ip/tcp.hpp>
namespace websocket = boost::beast::websocket;  // from <boost/beast/websocket.hpp>
namespace net = boost::asio;                    // from <boost/asio.hpp>

// The server instance
Server server;
std::mutex mutex;

void
doSession(tcp::socket& socket)
{   
    try
    {
        // Construct the stream by moving in the socket
        websocket::stream<tcp::socket> ws{std::move(socket)};

        // Accept the websocket handshake
        ws.accept();
        
        // Create the session
        mutex.lock();
        int session = server.createSession ();
        mutex.unlock();
        
        std::cout << "[" << session << "] " << "Established" << std::endl;

        for(;;)
        {
            boost::beast::multi_buffer buffer;
            boost::beast::error_code ec;
            std::string message, answer;
            
            ws.read(buffer, ec);

            if (ec == websocket::error::closed) 
                break;

            ws.text(ws.got_text());
            
            message = boost::beast::buffers_to_string(buffer.data());
            std::cout << "[" << session << "] " << "Message: " << message << std::endl;
            
            try 
            {
                mutex.lock();
                try
                {
                    answer = server.process(message, session);
                }
                catch(std::exception const& e)
                {
                    std::cerr << "Error: " << e.what() << std::endl;
                    answer = "ERR";
                }
                
                mutex.unlock();
                
                std::cout << "[" << session << "] " << "Answer: " << answer << std::endl;
                ws.write(net::buffer (answer));
            } 
            catch (InvalidSessionException& e) 
            {
                ws.write (net::buffer("Server error. Closing."));
                ws.close (boost::beast::websocket::close_reason());
                std::cout << "[" << session << "] " << "Error: " << e.what() << std::endl;
            }
            
        }
        
        server.closeSession (session);
        std::cout << "[" << session << "] " << "Closed" << std::endl;
    }
    catch(boost::system::system_error const& se)
    {
        // This indicates that the session was closed
        if(se.code() != websocket::error::closed)
            std::cerr << "Error: " << se.code().message() << std::endl;
    }
    catch(std::exception const& e)
    {
        std::cerr << "Error: " << e.what() << std::endl;
    }
}

int main(int argc, char* argv[])
{
    try
    {
        // Check command line arguments.
        if (argc != 3)
        {
            std::cerr <<
                "Usage: main <address> <port>\n" <<
                "Example:\n" <<
                "    main 0.0.0.0 8080\n";
            return EXIT_FAILURE;
        }
        auto const address = boost::asio::ip::make_address(argv[1]);
        auto const port = static_cast<unsigned short>(std::atoi(argv[2]));

        // The io_context is required for all I/O
        boost::asio::io_context ioc{1};

        // The acceptor receives incoming connections
        tcp::acceptor acceptor{ioc, {address, port}};
        
        for(;;)
        {
            // This will receive the new connection
            tcp::socket socket{ioc};

            // Block until we get a connection
            acceptor.accept(socket);

            // Launch the session, transferring ownership of the socket
            std::thread{std::bind(
                &doSession,
                std::move(socket))}.detach();
        }
    }
    catch (const std::exception& e)
    {
        std::cerr << "Error: " << e.what() << std::endl;
        return EXIT_FAILURE;
    }
}
