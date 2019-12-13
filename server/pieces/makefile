CC = g++
CFLAGS = -std=c++17
CCOMPILE = -c 

all: BishopPiece.o KnightPiece.o Piece.o RookPiece.o KingPiece.o PawnPiece.o QueenPiece.o

BishopPiece.o: BishopPiece.cpp  
	$(CC) $(CFLAGS) $(CCOMPILE) BishopPiece.cpp
KingPiece.o: KingPiece.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) KingPiece.cpp
Piece.o: Piece.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) Piece.cpp
RookPiece.o: RookPiece.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) RookPiece.cpp
KnightPiece.o: KnightPiece.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) KnightPiece.cpp
PawnPiece.o: PawnPiece.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) PawnPiece.cpp
QueenPiece.o: QueenPiece.cpp
	$(CC) $(CFLAGS) $(CCOMPILE) QueenPiece.cpp

clean:
	rm *.o
