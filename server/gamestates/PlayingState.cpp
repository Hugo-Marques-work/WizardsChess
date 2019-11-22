#include "PlayingState.h"
#include "../Game.h"

void PlayingState::accept (GameStateVisitor* visitor) 
{
    visitor->visitPlaying(this);
}

void PlayingState::move(bool white, const Position& origin, const Position& dest) 
{
    if( white != _game->getTurn() )
    {
        throw NotYourTurnException();
    }
    ChessMatrix* m = _game->getMatrix();
    Piece* p = m->get(origin);

    if(p == nullptr)
    {
        throw NoSuchPieceException();
    }

    _moveCounter++;

    bool enPassant = false;
    for(Position& pos : _game->getEnPassantOrigin())
    {
        if(pos==origin && dest == (*_game->getEnPassantDest() )) 
            enPassant = true;
    }
    if(enPassant) 
    {
        Piece* pAlt = _game->getEnPassantPiece();

        pAlt->die();
        _currentPieces--;
        _moveCounter = 0; 

        m->set(dest, p);
        m->set(origin, nullptr);
        p->setPos(dest);
    }

    
    else if(p->validateMove(dest)==true)
    {
        Piece* destP = m->get(dest);
        if(destP != nullptr)
        {
            destP->die();
            _currentPieces--;
            _moveCounter = 0;
        }

        // p is pawnpiece
        if( dynamic_cast<PawnPiece*>(p) != nullptr )
            _moveCounter = 0;

        m->set(dest, p);
        m->set(origin, nullptr);
        //CAN THROW "PAWN_PROMOTION_EXCEPTION"
        p->setPos(dest);
    }
    else 
    {
        throw InvalidMoveException();
    }

    checkVictory();
    checkDraw();
    checkFiftyMove();
}

#include <iostream>
 
void PlayingState::checkVictory()
{
    KingPiece& kW = _game->getKing(true);
    KingPiece& kB = _game->getKing(false);
    if( ! kB.getAlive() || ! kW.getAlive() )
    {
        if(kB.getAlive() && kW.getAlive())
        {
            throw ImpossibleBoardStateException();
        }
        bool white = ! kW.getAlive();
        _game->setState(new WinState(_game, white));

        std::cout << "win" << std::endl;
        
        delete this;
    }
    /*
    FIXME IF ENEMY KING IS CHECKED AND CAN'T MOVE AND SOMEONE CAN'T DE_CHECK KING, THEN WIN*/
}

void PlayingState::checkDraw()
{
    if( checkStalemate() || checkSpecialCase() )
    {
        _game->setState( new DrawState(_game) );        
        std::cout << "draw" << std::endl;

        delete this; 
    }
}

bool PlayingState::checkStalemate()
{
    ChessMatrix* m = _game->getMatrix();

    for(int x = 0; x < MAX_X; x++)
    {
        for(int y = 0; y < MAX_Y; y++)
        {
            Piece* p = m->get(Position(x,y));
            if(p==nullptr || p->isWhite()!=_game->getTurn()) continue;
            if(!p->getValidMoves().empty())
            {
                return false;
            }
        }
    }

    return true;
}

bool PlayingState::checkSpecialCase()
{
    //king against king
    if(_currentPieces==2) return true;

    //king against king and bishop or king against king and knight
    else if(_currentPieces==3)
    {
        std::list<BishopPiece>& bishops1 = _game->getBishop(true); 
        std::list<BishopPiece>& bishops2 = _game->getBishop(false);
        std::list<KnightPiece>& knights1 = _game->getKnight(true);
        std::list<KnightPiece>& knights2 = _game->getKnight(false);
        for(BishopPiece& p : bishops1)
        {
            if(p.getAlive()) return true;
        }
        for(BishopPiece& p : bishops2)
        {
            if(p.getAlive()) return true;
        }
        for(KnightPiece& p : knights1)
        {
            if(p.getAlive()) return true;
        }
        for(KnightPiece& p : knights2)
        {
            if(p.getAlive()) return true;
        }
    }

    //king and bishop versus king and bishop with the bishops on the same colored square.
    else if(_currentPieces==4)
    {    
        std::list<BishopPiece>& bishopsW = _game->getBishop(true); 
        std::list<BishopPiece>& bishopsB = _game->getBishop(false);
        int counter = 0;
        int parity = 0;
        for(BishopPiece& b : bishopsW)
        {
            if(b.getAlive())
            {
                counter++;
                parity = (b.getPos().x + b.getPos().y)%2;
            }
        }
        if(counter==1)
        {
            for(BishopPiece& b : bishopsB)
            {
                if(b.getAlive()) 
                {
                    int parity2 = (b.getPos().x + b.getPos().y)%2;
                    if(parity == parity2)
                    {
                        return true;
                    }
                }
            }   
        }
    } 

    return false;
}

bool PlayingState::checkFiftyMove()
{
    //FIXME
    /*Not on Draw because it POSSIBILITATES DRAW, it doesn't imediatly jump to it.
    Might be a new state or just a variable "canDraw", we can choose.*/
    if(_moveCounter > MAX_COUNTER) return true;
    return false;
}

/*FIXME MISSING CASE:
    Draw - https://en.wikipedia.org/wiki/Threefold_repetition
    
    Capture - https://en.wikipedia.org/wiki/En_passant
    HAVE AN IDEA! Ponteiro no board

    Moves - https://en.wikipedia.org/wiki/Castling 

    Misc - Pawn Promotion!
    EXCEPTION!!!
*/