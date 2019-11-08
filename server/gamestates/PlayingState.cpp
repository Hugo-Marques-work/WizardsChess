#include "PlayingState.h"

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

    if(p->validateMove(dest)==true)
    {
        Piece* destP = m->get(dest);
        if(destP != nullptr)
        {
            destP->die();
            _currentPieces--;
            _moveCounter = 0;
        }
        /* FIXME! ANALYZE INSTANCEOF
        std::array<PawnPiece,8>& pawns = _game->getPawn(white);
        for(PawnPiece& p2 : pawns)
        {
            if(p2.getId()==p->getId()) 
            {
                _moveCounter = 0;
                break;
            }
        }*/
        //FIXME check if works

        // p is pawnpiece
        if( dynamic_cast<PawnPiece*>(p) != nullptr )
            _moveCounter = 0;

        m->set(dest, p);
        m->set(origin, nullptr);
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
        delete this;
    }
    /*
    FIXME IF ENEMY KING IS CHECKED AND CAN'T MOVE, THEN WIN*/
}

void PlayingState::checkDraw()
{
    if( checkStalemate() || checkSpecialCase() )
    {
        _game->setState( new DrawState(_game) );
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
                return true;
            }
        }
    }

    return false;
}

bool PlayingState::checkSpecialCase()
{
    //king against king
    if(_currentPieces==2) return true;

    //king against king and bishop or king against king and knight
    else if(_currentPieces==3)
    {
        std::array<BishopPiece,2>& bishops1 = _game->getBishop(true); 
        std::array<BishopPiece,2>& bishops2 = _game->getBishop(false);
        std::array<KnightPiece,2>& knights1 = _game->getKnight(true);
        std::array<KnightPiece,2>& knights2 = _game->getKnight(false);
        
        if(bishops1[0].getAlive() || bishops1[1].getAlive() ||
            bishops2[0].getAlive() || bishops2[1].getAlive() ||
            knights1[0].getAlive() || knights1[1].getAlive() ||
            knights2[0].getAlive() || knights2[1].getAlive() )
        {
            return true;
        }
    }

    //king and bishop versus king and bishop with the bishops on the same colored square.
    else if(_currentPieces==4)
    {    
        std::array<BishopPiece,2>& bishopsW = _game->getBishop(true); 
        std::array<BishopPiece,2>& bishopsB = _game->getBishop(false);
        
        //Same parity in pos.x + pos.y = same color squares
        if( (bishopsW[0].getAlive() || bishopsW[1].getAlive() ) &&
            (bishopsB[0].getAlive() || bishopsB[1].getAlive() ) )
        {
            int parityW = bishopsW[0].getAlive() ? 
                bishopsW[0].getPos().x + bishopsW[0].getPos().y :
                bishopsW[1].getPos().x + bishopsW[1].getPos().y ;

            int parityB = bishopsB[0].getAlive() ? 
                bishopsB[0].getPos().x + bishopsB[0].getPos().y :
                bishopsB[1].getPos().x + bishopsB[1].getPos().y ;

            if(parityB == parityW) return true;
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
    Moves - https://en.wikipedia.org/wiki/Castling 
    Misc - Pawn Promotion!*/