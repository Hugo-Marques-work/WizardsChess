CC = g++
CFLAGS = -std=c++17 -g
CCOMPILE = -c 

all: GameDropMessage.o ListGamesMessage.o Parser.o GameLastMoveMessage.o\
Message.o PawnPromotionMessage.o GameMoveMessage.o MessageFactory.o\
RegMessage.o GameStatusMessage.o MessageVisitor.o GameTurnMessage.o\
NewGameMessage.o

GameDropMessage.o: GameDropMessage.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) GameDropMessage.cpp

ListGamesMessage.o: ListGamesMessage.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) ListGamesMessage.cpp

Parser.o: Parser.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) Parser.cpp

GameLastMoveMessage.o: GameLastMoveMessage.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) GameLastMoveMessage.cpp

Message.o: Message.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) Message.cpp

PawnPromotionMessage.o: PawnPromotionMessage.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) PawnPromotionMessage.cpp

GameMoveMessage.o: GameMoveMessage.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) GameMoveMessage.cpp

MessageFactory.o: MessageFactory.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) MessageFactory.cpp

RegMessage.o: RegMessage.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) RegMessage.cpp

GameStatusMessage.o: GameStatusMessage.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) GameStatusMessage.cpp
	
MessageVisitor.o: MessageVisitor.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) MessageVisitor.cpp
	
GameTurnMessage.o: GameTurnMessage.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) GameTurnMessage.cpp

NewGameMessage.o: NewGameMessage.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) NewGameMessage.cpp

clean:
	rm *.o
