CC = g++
CFLAGS = -std=c++17 -g
CCOMPILE = -c 

all: GameDropMessage.o ListGamesMessage.o Parser.o GameLastMoveMessage.o\
PawnPromotionMessage.o GameMoveMessage.o MessageFactory.o\
RegMessage.o GameStatusMessage.o  GameTurnMessage.o\
NewGameMessage.o LoginMessage.o ImportGameMessage.o

GameDropMessage.o: GameDropMessage.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) GameDropMessage.cpp

ListGamesMessage.o: ListGamesMessage.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) ListGamesMessage.cpp

Parser.o: Parser.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) Parser.cpp

GameLastMoveMessage.o: GameLastMoveMessage.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) GameLastMoveMessage.cpp

PawnPromotionMessage.o: PawnPromotionMessage.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) PawnPromotionMessage.cpp

GameMoveMessage.o: GameMoveMessage.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) GameMoveMessage.cpp

MessageFactory.o: MessageFactory.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) MessageFactory.cpp

RegMessage.o: RegMessage.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) RegMessage.cpp
	
LoginMessage.o: LoginMessage.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) LoginMessage.cpp

GameStatusMessage.o: GameStatusMessage.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) GameStatusMessage.cpp

GameTurnMessage.o: GameTurnMessage.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) GameTurnMessage.cpp

NewGameMessage.o: NewGameMessage.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) NewGameMessage.cpp
	
ImportGameMessage.o: ImportGameMessage.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) ImportGameMessage.cpp

clean:
	rm *.o
