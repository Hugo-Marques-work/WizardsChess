#include <iostream>
#include "Pieces/PawnPiece.cpp"
#include "Pieces/RookPiece.cpp"
#include "Pieces/QueenPiece.cpp"
#include "Pieces/KingPiece.cpp"
#include "Pieces/KnightPiece.cpp"
#include "Pieces/BishopPiece.cpp"

using namespace std;

void ChessMatrix::oneSideBoardCreation(bool white,bool forward)
{
    int id = 0;
    int firstY = 6;
    int secondY = 7;
    if(forward == true)
    {
        firstY = 1;
        secondY = 0;
    }
    int y = firstY;
    for(int x = 0; x < MAX_X; x++)
    {
        _pieces.at(x).at(y) = (Piece*) new PawnPiece(id++,
            white,Position(x,y),this,forward);
    }
    y = secondY;
    for(int x = 0; x < MAX_X; x++)
    {
        if(x==0 || x == MAX_X - 1)
        {
            _pieces.at(x).at(y) = (Piece*) new RookPiece(id++,
                white,Position(x,y),this,forward);
        }
        else if(x==1 || x == MAX_X -2)
        {
            _pieces.at(x).at(y) = (Piece*) new KnightPiece(id++,
                white,Position(x,y),this, forward);
        }
        else if(x==2 || x == MAX_X -3)
        {
            _pieces.at(x).at(y) = (Piece*) new BishopPiece(id++,
                white,Position(x,y),this, forward);
        }
        else if(x==3)
        {
            _pieces.at(x).at(y) = (Piece*) new KingPiece(id++,
                white,Position(x,y),this, forward);
        }
        else if(x==4)
        {
            _pieces.at(x).at(y) = (Piece*) new QueenPiece(id++,
                white,Position(x,y),this, forward);
        }
    }

}
ChessMatrix::ChessMatrix()
{ 
    _pieces = array< array<Piece*,8>, 8>();
    for(int x = 0; x < MAX_X; x++)
    {
        for(int y = 0; y < MAX_Y; y++)
        {
            _pieces.at(x).at(y) = nullptr;
        }
    }
    oneSideBoardCreation(true,true);
    oneSideBoardCreation(false,false);
}

//Has some std::couts to help with text simulation
void ChessMatrix::set(Position pos, Piece* p)
{
    //Throw out_of_range
    if(p == nullptr)
    {
        std::cout << "No piece there" << endl;
        return;
    }
    Position& lastPos = p->getPos();
    if(p->validateMove(pos)==true)
    {
        _pieces.at(pos.x).at(pos.y) = p;

        _pieces.at(lastPos.x).at(lastPos.y) = nullptr;
        p->move();
        p->setPos(pos);
    }
    else
    {
        std::cout << "Couldn't" << endl;
    }
}

//Optional
void ChessMatrix::printMatrix()
{
    //Text Simulation
    for(int y = -1; y < MAX_Y; y++)
    {
        if(y!=-1)std::cout << y << ":";
        else std::cout << " " << ":";
        for(int x = 0; x < MAX_X; x++)
        {
            if(y==-1) std::cout << x;
            else if(_pieces.at(x).at(y)==nullptr) std::cout << "-";
            else _pieces.at(x).at(y)->debugPrint();
            std::cout << " ";
        }
        std::cout << endl;
    }
    /* POSSIBLE MOVEMENTS:
    for(int y = 0; y < MAX_Y; y++)
    {
        for(int x = 0; x < MAX_X; x++)
        {
            std::cout << "pos:" << x << "|" << y << std::endl<<std::flush;
            if(_pieces.at(x).at(y)==nullptr) continue;
            std::cout << "validMoves:"<<std::flush;
            for(Position p : (_pieces.at(x).at(y))->getValidMoves())
            {
                std::cout << "first" <<p.x <<"second" << p.y<<std::flush;
            }
            std::cout << endl;
        }
    }*/

}
//Removing this will remove the text simulation
int main()
{
    ChessMatrix* m = new ChessMatrix();
    m->printMatrix();
    while(true)
    {
        int xOld,xNew,yOld,yNew;
        cin >> xOld >> yOld >> xNew >> yNew;
        m->set(Position(xNew,yNew),m->get(Position(xOld,yOld)));
    
        std::cout << endl << endl;
        m->printMatrix();
    }
    return 0;
}
