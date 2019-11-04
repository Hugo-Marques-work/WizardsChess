#ifndef GAMESTATEVISITOR_H
#define GAMESTATEVISITOR_H

class GameStateVisitor
{
public:
    void visitPlaying (PlayingState* state) = 0;
    void visitDraw (DrawState* state) = 0;
    void visitWin (WinState* state) = 0;
    void visitDrop (PlayingDrop* state) = 0;
};

#endif
