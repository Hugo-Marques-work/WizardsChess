all: SubGame
	
SubGame: Piece.o ChessMatrix.o KnightPiece.cpp KingPiece.cpp RookPiece.cpp QueenPiece.cpp PawnPiece.cpp BishopPiece.cpp
	g++ -std=c++17 Piece.o ChessMatrix.o KnightPiece.cpp KingPiece.cpp RookPiece.cpp QueenPiece.cpp PawnPiece.cpp BishopPiece.cpp -o SubGame
	
ChessMatrix.o: ChessMatrix.cpp ChessMatrix.h Piece.h KnightPiece.cpp KingPiece.cpp RookPiece.cpp QueenPiece.cpp PawnPiece.cpp BishopPiece.cpp
	g++ -std=c++17 ChessMatrix.cpp -c -o ChessMatrix.o

Piece.o: Piece.cpp Piece.h ChessMatrix.h
	g++ -std=c++17 Piece.cpp -c -o Piece.o
	
clean:
	rm *.o SubGame
