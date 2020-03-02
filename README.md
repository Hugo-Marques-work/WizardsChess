# WizardsChess
## Description
WizardsChess is a multiplayer browser game.
The server for the game was made in c++17
The client for the game was made in html, css and javascript

We used the following external libraries
Server: boost
Client: three js

Made in hackerschool.
The project is not finished.
## Run
### Run the game server
1. Build
    To build, you need boost in directory server/extras

    '''
    cd server/
    make
    '''

2. Run the server locally
    '''
    ./main 0.0.0.0 port
    '''
### Run the client
1. Find the game server ip/port and set it in js/ServerAddress.js
2. open index.html by using Firefox

