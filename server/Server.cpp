#include "Server.h"
#include "exceptions/FirstTurnException.h"
#include "exceptions/NotYourTurnException.h"
#include "exceptions/NoSuchPieceException.h"
#include "exceptions/PieceNotYoursException.h"
#include "exceptions/InvalidSessionException.h"
#include "Move.h"
#include "CheckGameVisitor.h"
#include "PawnPromotionStrategy.h"

Server::Server () : _nextGameId (1), _nextSession(1)
{
    
}


std::string Server::process(const std::string& msg, int session) 
{
    std::map<int, Session*>::iterator it;
    
    if ((it = _sessions.find(session)) != _sessions.end()) 
    {
        Session* session = it->second;
        Message* message = _factory.parse(msg);

        std::string answer = message->accept(this, session);
        
        delete message;
        
        return answer;
    }
    
    else
    {
        throw InvalidSessionException();
    }
}

int Server::createSession () 
{
    Session* session = new Session();
    _sessions.insert(std::make_pair(_nextSession, session));
    
    return _nextSession++;
}

void Server::closeSession (int session)
{
    std::map<int, Session*>::iterator it;
    
    if ((it = _sessions.find(session)) != _sessions.end()) 
    {
        Session* session = it->second;
        delete session;
        
        _sessions.erase (it);
    }
    
    else
    {
        throw InvalidSessionException();
    }
}

Player* Server::searchPlayer (const std::string& user)
{
    std::map<std::string, Player*>::iterator it;
    
    if ((it = _players.find(user)) != _players.end())
        return it->second;
    else
        return nullptr;
}

std::string Server::visitReg (RegMessage* message, Session* session) 
{
    if (searchPlayer(message->user()) == nullptr)
    {
        Player* player = new Player (message->user(), message->pass());
        _players.insert(std::make_pair(message->user(), player));
        
        return "REG_A OK";
    }
    else
        return "REG_A ERR USER_USED";
}

std::string Server::visitListGames (ListGamesMessage* message, Session* session)
{
    Player* player;
    
    if ((player = searchPlayer(message->user())) != nullptr)
    {
        if (player->validatePassword(message->pass()))
        {
            std::string result ("LIST_GAMES_A OK ");
            
            result += std::to_string(player->games().size());
            
            for (std::pair <int, Game*> pair : player->games())
            {
                Game* game = pair.second;
                if (game->playerW() == player)
                    result += " " + std::to_string(game->gameId()) + " " + game->playerB()->user() + " W";
                else
                    result += " " + std::to_string(game->gameId()) + " " + game->playerW()->user() + " B";
            }
            
            return result;
        }
        else
            return "LIST_GAMES_A ERR PASSWORD";
    }
    else 
        return "LIST_GAMES_A ERR USER_NOT_FOUND";
}

std::string Server::visitGameMove (GameMoveMessage* message, Session* session)
{
    Player* player;
    Game* game;
    
    if ((player = searchPlayer(message->user())) != nullptr)
    {
        if (player->validatePassword(message->pass()))
        {
            game = player->searchGame (message->gameId());

            if (game == nullptr)
                return "GAME_MOVE_A ERR GAME_NOT_FOUND";
            
            try 
            {
                game->move (Position (message->x1(), message->y1()), 
                            Position (message->x2(), message->y2()), player->user());
                
                return "GAME_MOVE_A OK";
            }
            catch (NoSuchPieceException& e)
            {
                return "GAME_MOVE_A ERR NO_SUCH_PIECE";
            }
            catch (NotYourTurnException& e)
            {
                return "GAME_MOVE_A ERR NOT_YOUR_TURN";
            }
            catch (PieceNotYoursException& e)
            {
                return "GAME_MOVE_A ERR PIECE_NOT_YOURS";
            }
            catch (PawnPromotionException& e) 
            {
                return "GAME_MOVE_A MORE PAWN_PROMOTION";
            }
            catch (InvalidMoveException& e)
            {
                return "GAME_MOVE_A ERR INVALID_MOVE";
            }
        }
        else
            return "GAME_MOVE_A ERR PASSWORD";
    }
    else 
        return "GAME_MOVE_A ERR USER_NOT_FOUND";
}

std::string Server::visitGameStatus (GameStatusMessage* message, Session* session)
{
    Player* player;
    CheckGameVisitor visitor;
    
    if ((player = searchPlayer(message->user())) != nullptr)
    {
        if (player->validatePassword(message->pass()))
        {
            Game* game = player->searchGame (message->gameId());

            if (game == nullptr)
                return "GAME_STATUS_A ERR GAME_NOT_FOUND";
            
            return "GAME_STATUS_A OK " + game->getState()->accept(&visitor);
        }
        else
            return "GAME_STATUS_A ERR PASSWORD";
    }
    else 
        return "GAME_STATUS_A ERR USER_NOT_FOUND";
}

std::string Server::visitGameDrop (GameDropMessage* message, Session* session)
{
    Player* player;
    
    if ((player = searchPlayer(message->user())) != nullptr)
    {
        if (player->validatePassword(message->pass()))
        {   
            Game* game = player->searchGame(message->gameId());
            
            if (game != nullptr) 
            {
                player->removeGame(game->gameId());
                
                if (game->drop (player->user())) 
                {
                    Player* other = (game->playerB()->user() == player->user()) ?
                                     game->playerW() : game->playerB ();
                    other->removeGame(game->gameId());
                    _games.erase (game->gameId());
                    delete game;
                }
                
                return "GAME_DROP_A OK";
            }
            
            else 
                return "GAME_DROP_A ERR GAME_NOT_FOUND";
        }
        else
            return "GAME_DROP_A ERR PASSWORD";
    }
    else 
        return "GAME_DROP_A ERR USER_NOT_FOUND";
}

std::string Server::visitGameTurn (GameTurnMessage* message, Session* session)
{
    Player* player;
    
    if ((player = searchPlayer(message->user())) != nullptr)
    {
        if (player->validatePassword(message->pass()))
        {   
            Game* game = player->searchGame(message->gameId());
            if (game != nullptr) 
                return game->getTurn () ? "GAME_TURN_A OK W" :
                                          "GAME_TURN_A OK B";
            else
                return "GAME_TURN_A ERR GAME_NOT_FOUND";
        }
        else
            return "GAME_TURN_A ERR PASSWORD";
    }
    else 
        return "GAME_TURN_A ERR USER_NOT_FOUND";
}

std::string Server::visitGameLastMove (GameLastMoveMessage* message, Session* session)
{
    Player* player;
    
    if ((player = searchPlayer(message->user())) != nullptr)
    {
        if (player->validatePassword(message->pass()))
        {   
            Game* game = player->searchGame(message->gameId());
            if (game != nullptr) 
            {
                try
                {
                    Move move = game->lastMove();
                    return "GAME_LAST_MOVE_A OK " 
                            + std::to_string(move.origin.x) + " "
                            + std::to_string(move.origin.y) + " "
                            + std::to_string(move.destination.x) + " "
                            + std::to_string(move.destination.y);
                }
                catch (FirstTurnException& e)
                {
                    return "GAME_LAST_MOVE_A ERR FIRST_TURN";
                }                   
            }
            else
                return "GAME_LAST_MOVE_A ERR GAME_NOT_FOUND";
        }
        else
            return "GAME_LAST_MOVE_A ERR PASSWORD";
    }
    else 
        return "GAME_LAST_MOVE_A ERR USER_NOT_FOUND";
}

std::string Server::visitPawnPromotion (PawnPromotionMessage* message, Session* session) 
{
    Player* player;
    
    if ((player = searchPlayer(message->user())) != nullptr)
    {
        if (player->validatePassword(message->pass()))
        {   
            Game* game = player->searchGame(message->gameId());
            if (game != nullptr) 
            {
                try
                {
                    /*message has pieceType because Message is only
                     syntatic representation*/
                    
                    PawnPromotionStrategy *strategy;
                    
                    if (message->pieceType() == "QUEEN")
                        strategy = new PromoteToQueen;
                    
                    else if (message->pieceType() == "KNIGTH")
                        strategy = new PromoteToKnight;
                    
                    else if (message->pieceType() == "ROOK")
                        strategy = new PromoteToRook;
                    
                    else if (message->pieceType() == "BISHOP")
                        strategy = new PromoteToBishop;
                    
                    else
                        return "PAWN_PROMOTION_A ERR PIECE_TYPE";
                    
                    game->promote (strategy);
                    
                    delete strategy;
                    return "PAWN_PROMOTION_A OK";
                }
                catch (InvalidActionException& e)
                {
                    return "PAWN_PROMOTION_A ERR INVALID_ACTION";
                }                   
            }
            else
                return "PAWN_PROMOTION_A ERR GAME_NOT_FOUND";
        }
        else
            return "PAWN_PROMOTION_A ERR PASSWORD";
    }
    else 
        return "PAWN_PROMOTION_A ERR USER_NOT_FOUND";
}

std::string Server::visitNewGame (NewGameMessage* message, Session* session)
{
    /*poor solution*/
    
    Player *player1, *player2;
    
    player1 = searchPlayer(message->user1());
    player2 = searchPlayer(message->user2());
    
    if (player1 == nullptr || player2 == nullptr)
        return "NEW_GAME_A ERR USER_NOT_FOUND";
    
    if (player1->user() == player2->user())
        return "NEW_GAME_A ERR SAME_USER";
    
    Game* game = new Game (_nextGameId, player1, player2);
    
    _games.insert (std::make_pair (_nextGameId, game));
    
    player1->addGame (game);
    player2->addGame (game);
    
    _nextGameId++;
    
    return "NEW_GAME_A OK";
}

Server::~Server () 
{
    std::map<std::string, Player*>::iterator it1;
    std::map<int, Game*>::iterator it2;
    std::map<int, Session*>::iterator it3; 
    
    for (it1 = _players.begin(); it1 != _players.end(); it1++) 
        delete it1->second;
    
    for (it2 = _games.begin(); it2 != _games.end(); it2++) 
        delete it2->second;
    
    //FIXME terminar todas as ligacoes
    for (it3 = _sessions.begin(); it3 != _sessions.end(); it3++) 
        delete it3->second;
}
