CC = g++
CFLAGS = -std=c++17 -g
CCOMPILE = -c 

all: DrawState.o PlayingState.o WinState.o \
DropState.o WaitingForPromotionState.o

DrawState.o: DrawState.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) DrawState.cpp

PlayingState.o: PlayingState.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) PlayingState.cpp
	
WinState.o: WinState.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) WinState.cpp
	
DropState.o: DropState.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) DropState.cpp
	
WaitingForPromotionState.o: WaitingForPromotionState.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) WaitingForPromotionState.cpp

clean:
	rm *.o
