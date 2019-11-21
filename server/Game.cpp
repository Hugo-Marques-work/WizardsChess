#include "Game.h"
#include <list> 
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

    createDrawConditions(); 
}

void Game::createDrawConditions()
{ 
    /*std::list<Piece*> condition;
    
    _drawCondition.push_front();
    _drawCondition.push_front(_bishopB[0]);
    _drawCondition.push_front(_bishopB[1]);
    _drawCondition.push_front(_bishopW[0]);
    _drawCondition.push_front(_bishopW[1]);

    _drawCondition.push_front(_knightB[0]);
    _drawCondition.push_front(_knightB[1]);
    _drawCondition.push_front(_knightW[0]);
    _drawCondition.push_front(_knightW[1]);*/
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

        _pawnW.push_back(PawnPiece(x*2, true, posW, this, forward) );
        _pawnB.push_back(PawnPiece(x*2+1, false, posB, this, !forward) );
        
        _chessMatrix.set(posB, &_pawnB.back);
        _chessMatrix.set(posW, &_pawnW.back);
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
            _rookW.push_back(RookPiece(rookId*2, true, posW, this, forward) );
            _rookB.push_back(RookPiece(rookId*2+1, false, posB, this, !forward) );
            _chessMatrix.set(posB, &_rookB.back);
            _chessMatrix.set(posW, &_rookW.back);
            rookId++;
        }
        else if(x==1 || x == MAX_X -2)
        {
            _knightW.push_back(KnightPiece(knightId*2, true, posW, this, forward) );
            _knightB.push_back(KnightPiece(knightId*2+1, false, posB, this, !forward) );
            _chessMatrix.set(posB, &_knightB.back);
            _chessMatrix.set(posW, &_knightW.back);
            knightId++;
        }
        else if(x==2 || x == MAX_X -3)
        {
            _bishopW.push_back(BishopPiece(bishopId*2, true, posW, this, forward) );
            _bishopB.push_back(BishopPiece(bishopId*2+1, false, posB, this, !forward) );
            _chessMatrix.set(posB, &_bishopB.back);
            _chessMatrix.set(posW, &_bishopW.back);
            bishopId++;
        }
        else if(x==3)
        {
            _kingW.set(kingId*2, true, posW, this, forward);
            _kingB.set(kingId*2+1, false, posB, this, !forward);
            _chessMatrix.set(posB, &_kingB);
            _chessMatrix.set(posW, &_kingW);
            kingId++;
        }  
        else if(x==4)
        {
            _queenW.push_back(QueenPiece(queenId*2, true, posW, this, forward) );
            _queenB.push_back(QueenPiece(queenId*2+1, false, posB, this, !forward) );
            _chessMatrix.set(posB, &_queenB.back);
            _chessMatrix.set(posW, &_queenW.back);
            queenId++;
        }
    }
}

void Game::move(bool white, const Position& origin, const Position& dest) 
{
    _state->move(white, origin,dest);
}
 
void Game::fillEnPassant(const Position& lastPos,Piece* piece)
{
    bool white = piece->isWhite();
    std::list<Position> posList;
    Position& pos = piece->getPos();
    if(white)
    {
        for(PawnPiece& p : _pawnW)
        {
            if(p.getPos().y == pos.y && (p.getPos().x+1 == 
                pos.x || p.getPos().x-1 == pos.x) )
            {
                posList.push_front(pos);
            }
        }
    }
    else
    {
        for(PawnPiece& p : _pawnB)
        {
            if(p.getPos().y == pos.y && (p.getPos().x+1 == 
                pos.x || p.getPos().x-1 == pos.x) )
            {
                posList.push_front(pos);
            }
        }        
    }

    _chessMatrix.setEnPassant(piece, lastPos, posList);
}

#include <iostream>

//Removing this will remove the text simulation
int main()
{
    Game* game(0); 
    ChessMatrix* m = game->getMatrix();
    m->printMatrix();
    bool white = true;        
    int xOld,xNew,yOld,yNew;
    while(true)
    {
        std::cin >> xOld >> yOld >> xNew >> yNew;

        Position lastPos(xOld,yOld);
        Position newPos(xNew,yNew);

        if(white != game->getCell(lastPos)->isWhite())
            continue;

        game->move(white,lastPos,newPos); 

        std::cout << std::endl << std::endl;
        
        m->printMatrix();
        white = !white;
    }
    return 0;
}
