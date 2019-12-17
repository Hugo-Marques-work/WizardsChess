CC = g++
CFLAGS = -std=c++17 -g
CCOMPILE = -c 

all: DrawState.o GameState.o PlayingState.o WinState.o \
DropState.o GameStateVisitor.o WaitingForPromotionState.o

DrawState.o: DrawState.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) DrawState.cpp
	
GameState.o: GameState.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) GameState.cpp
	
PlayingState.o: PlayingState.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) PlayingState.cpp
	
WinState.o: WinState.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) WinState.cpp
	
DropState.o: DropState.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) DropState.cpp
	
GameStateVisitor.o: GameStateVisitor.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) GameStateVisitor.cpp
	
WaitingForPromotionState.o: WaitingForPromotionState.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) WaitingForPromotionState.cpp

clean:
	rm *.o
