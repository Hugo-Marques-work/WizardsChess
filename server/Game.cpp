#include "Game.h"

Game::Game (int gameId) 
{
    _gameId = gameId;
    _whiteTurn = false; //FIXME Quem e o primeiro?
}

void Game::move(const std::pair<int, int>& origin, const std::pair<int, int>& dest) 
{
    
}
