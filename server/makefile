CC = g++
BOOSTFLAGS = -I extras/boost_1_72_0/
CFLAGS = -std=c++11 -g
CCOMPILE = -c
LINK = -pthread

all: CheckGameVisitor.o Game.o main.o Server.o ChessMatrix.o Player.o Session.o
	make -C pieces
	make -C gamestates
	make -C messages
	$(CC) $(CFLAGS) $(LINK) messages/*.o pieces/*.o gamestates/*.o  *.o -o main

CheckGameVisitor.o: CheckGameVisitor.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) CheckGameVisitor.cpp
Game.o: Game.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) Game.cpp
Server.o: Server.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) Server.cpp
ChessMatrix.o: ChessMatrix.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) ChessMatrix.cpp
Player.o: Player.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) Player.cpp
Session.o: Session.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) Session.cpp
main.o: main.cpp
	$(CC) $(CFLAGS) $(BOOSTFLAGS) $(CCOMPILE) main.cpp
clean:
	make clean -C pieces
	make clean -C gamestates
	make clean -C messages
	rm *.o main
