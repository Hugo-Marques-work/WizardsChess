#include "Game.h"

Game::Game (int gameId) 
{
    _gameId = gameId;
    _whiteTurn = false; //FIXME Quem e o primeiro?

    for(int x = 0; x < MAX_X; x++)
    {
        for(int y = 0; y < MAX_Y; y++)
        {
            _chessMatrix.set(Position(x,y), nullptr);
        }
    }
    
    boardCreation();
    boardCreation();

    createDrawConditions();
}

void Game::boardCreation()
{
    bool forward = true;

    int firstYB = 6;
    int secondYB = 7;
    int firstYW = 1;
    int secondYW = 0;
    
    Position posW(0,firstYW);
    Position posB(0,firstYB);

    for(int x = 0; x < MAX_X; x++)
    {
        posW.x = x; 
        posB.x = x;

        _pawnW[x].set(x*2, true, posW, _chessMatrix, forward);
        _pawnB[x].set(x*2+1, false, posB, _chessMatrix, !forward);
        
        _pieces.set(posB, _pawnB);
        _pieces.set(posA, _pawnA);
    }

    posW.y = secondYW;
    posB.y = secondYB;

    int rookId = 0, knightId = 0, queenId = 0, bishopId = 0, knightId = 0;
    for(int x = 0; x < MAX_X; x++)
    {
        posW.x = x;
        posB.x = x; 
        if(x==0 || x == MAX_X - 1)
        {
            _rookW[rookId].set(rookId*2, true, posW, _chessMatrix, forward);
            _rookB[rookId].set(rookId*2+1, false, posB, _chessMatrix, !forward);
            rookId++
            _pieces.set(posB, _rookB);
            _pieces.set(posA, _rookW);
        }
        else if(x==1 || x == MAX_X -2)
        {
            _knightW[knightId].set(knightId*2, true, posW, _chessMatrix, forward);
            _knightB[knightId].set(knightId*2+1, false, posB, _chessMatrix, !forward);
            knightId++;
            _pieces.set(posB, _knightB);
            _pieces.set(posW, _knightW);
        }
        else if(x==2 || x == MAX_X -3)
        {
            _bishopW[bishopId].set(bishopId*2, true, posW, _chessMatrix, forward);
            _bishopB[bishopId].set(bishopId*2+1, false, posB, _chessMatrix, !forward);
            bishopId++;
            _pieces.set(posB, _bishopB);
            _pieces.set(posW, _bishopW);
        }
        else if(x==3)
        {
            _kingW[kingId].set(kingId*2, true, posW, _chessMatrix, forward);
            _kingB[kingId].set(kingId*2+1, false, posB, _chessMatrix, !forward);
            kingId++;
            _pieces.set(posB, _kingB);
            _pieces.set(posW, _kingW);
        }
        else if(x==4)
        {
            _queenW[queenId].set(queenId*2, true, posW, _chessMatrix, forward);
            _queenB[queenId].set(queenId*2+1, false, posB, _chessMatrix, !forward);
            queenId++;
            _pieces.set(posB, _queenB);
            _pieces.set(posW, _queenW);
        }
    }
}

void Game::move(const Position& origin, const Position& dest) 
{
    _state->move(origin,dest);
}
