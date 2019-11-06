CC = -std=c++17
CFLAGS = -c -o
pf = pieces
all: SubGame
	
SubGame: Position.h Piece.o ChessMatrix.o KnightPiece.o KingPiece.o RookPiece.o QueenPiece.o PawnPiece.o BishopPiece.o
	g++ $(CC) Position.h Piece.o ChessMatrix.o KnightPiece.o KingPiece.o RookPiece.o QueenPiece.o PawnPiece.o BishopPiece.o -o SubGame

ChessMatrix.o: ChessMatrix.cpp ChessMatrix.h $(pf)/Piece.h $(pf)/KnightPiece.h $(pf)/KingPiece.h $(pf)/RookPiece.h $(pf)/QueenPiece.h $(pf)/PawnPiece.h $(pf)/BishopPiece.h
	g++ $(CC) ChessMatrix.cpp $(CFLAGS) ChessMatrix.o

KingPiece.o: $(pf)/KingPiece.cpp $(pf)/KingPiece.h $(pf)/Piece.h
	g++ $(CC) $(pf)/KingPiece.cpp $(CFLAGS) KingPiece.o

KnightPiece.o: $(pf)/KnightPiece.cpp $(pf)/KnightPiece.h $(pf)/Piece.h
	g++ $(CC) $(pf)/KnightPiece.cpp $(CFLAGS) KnightPiece.o

PawnPiece.o: $(pf)/PawnPiece.cpp $(pf)/PawnPiece.h $(pf)/Piece.h
	g++ $(CC) $(pf)/PawnPiece.cpp $(CFLAGS) PawnPiece.o

QueenPiece.o: $(pf)/QueenPiece.cpp $(pf)/QueenPiece.h $(pf)/Piece.h
	g++ $(CC) $(pf)/QueenPiece.cpp $(CFLAGS) QueenPiece.o

RookPiece.o: $(pf)/RookPiece.cpp $(pf)/RookPiece.h $(pf)/Piece.h
	g++ $(CC) $(pf)/RookPiece.cpp $(CFLAGS) RookPiece.o 

BishopPiece.o: $(pf)/BishopPiece.cpp $(pf)/BishopPiece.h $(pf)/Piece.h
	g++ $(CC) $(pf)/BishopPiece.cpp $(CFLAGS) BishopPiece.o

Piece.o: $(pf)/Piece.cpp $(pf)/Piece.h ChessMatrix.h
	g++ $(CC) $(pf)/Piece.cpp $(CFLAGS) Piece.o
	
clean:
	rm *.o SubGame
