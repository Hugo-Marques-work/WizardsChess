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

void Game::createDrawConditions()
{
    std::list<Piece*> condition;
    
    condition.push_front();
    condition.push_front(_bishopB[0]);
    condition.push_front(_bishopB[1]);
    condition.push_front(_bishopW[0]);
    condition.push_front(_bishopW[1]);

    condition.push_front(_knightB[0]);
    condition.push_front(_knightB[1]);
    condition.push_front(_knightW[0]);
    condition.push_front(_knightW[1]);
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

        _pawnW[x].set(x*2, true, posW, &_chessMatrix, forward);
        _pawnB[x].set(x*2+1, false, posB, &_chessMatrix, !forward);
        
        _chessMatrix.set(posB, &_pawnB[x]);
        _chessMatrix.set(posW, &_pawnW[x]);
    }

    posW.y = secondYW;
    posB.y = secondYB;

    int rookId = 0, knightId = 0, queenId = 0, bishopId = 0, kingId = 0;
    for(int x = 0; x < MAX_X; x++)
    {
        posW.x = x;
        posB.x = x; 
        if(x==0 || x == MAX_X - 1)
        {
            _rookW[rookId].set(rookId*2, true, posW, &_chessMatrix, forward);
            _rookB[rookId].set(rookId*2+1, false, posB, &_chessMatrix, !forward);
            _chessMatrix.set(posB, &_rookB[rookId]);
            _chessMatrix.set(posW, &_rookW[rookId]);
            rookId++;
        }
        else if(x==1 || x == MAX_X -2)
        {
            _knightW[knightId].set(knightId*2, true, posW, &_chessMatrix, forward);
            _knightB[knightId].set(knightId*2+1, false, posB, &_chessMatrix, !forward);
            _chessMatrix.set(posB, &_knightB[knightId]);
            _chessMatrix.set(posW, &_knightW[knightId]);
            knightId++;
        }
        else if(x==2 || x == MAX_X -3)
        {
            _bishopW[bishopId].set(bishopId*2, true, posW, &_chessMatrix, forward);
            _bishopB[bishopId].set(bishopId*2+1, false, posB, &_chessMatrix, !forward);
            _chessMatrix.set(posB, &_bishopB[bishopId]);
            _chessMatrix.set(posW, &_bishopW[bishopId]);
            bishopId++;
        }
        else if(x==3)
        {
            _kingW.set(kingId*2, true, posW, &_chessMatrix, forward);
            _kingB.set(kingId*2+1, false, posB, &_chessMatrix, !forward);
            _chessMatrix.set(posB, &_kingB);
            _chessMatrix.set(posW, &_kingW);
            kingId++;
        } 
        else if(x==4)
        {
            _queenW.set(queenId*2, true, posW, &_chessMatrix, forward);
            _queenB.set(queenId*2+1, false, posB, &_chessMatrix, !forward);
            _chessMatrix.set(posB, &_queenB);
            _chessMatrix.set(posW, &_queenW);
            queenId++;
        }
    }
}

void Game::move(bool white, const Position& origin, const Position& dest) 
{
    _state->move(white, origin,dest);
}
