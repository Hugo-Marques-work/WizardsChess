#include "Game.h"

Game::Game (int gameId) 
{
    _gameId = gameId;
    _whiteTurn = false; //FIXME Quem e o primeiro?
}

void Game::move(const Position& origin, const Position& dest) 
{
    _state->move(origin,dest);
}
