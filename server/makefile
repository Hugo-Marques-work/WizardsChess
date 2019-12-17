CC = g++
CFLAGS = -std=c++17 -g
CCOMPILE = -c 

all: CheckGameVisitor.o Game.o main.o Server.o ChessMatrix.o Player.o
	make -C pieces
	make -C gamestates
	make -C messages
	$(CC) $(CFLAGS) messages/*.o pieces/*.o gamestates/*.o  *.o -o main

CheckGameVisitor.o: CheckGameVisitor.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) CheckGameVisitor.cpp
Game.o: Game.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) Game.cpp
main.o: main.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) main.cpp
Server.o: Server.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) Server.cpp
ChessMatrix.o: ChessMatrix.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) ChessMatrix.cpp
Player.o: Player.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) Player.cpp

clean:
	make clean -C pieces
	make clean -C gamestates
	make clean -C messages
	rm *.o main
