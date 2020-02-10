class AnimationState extends GameBridgeState {
    constructor(gameBridge, move, deadPiece, returnFunc) {
        super(gameBridge);
        this.move = move;
        this.deadPiece = deadPiece;
        this.returnFunc = returnFunc;
        
        this.doAnimations();
        setTimeout(this.finishAnimation.bind(this),3500);
    }

    doAnimations() {
        this.move.from.changePos(true);

        if(this.deadPiece!=null) {
            this.bridge.game.getCellVisual(this.move.toPos).killPiece();
            this.deadPiece.dieVisual();
        }
    }

    finishAnimation() {
        if(this.deadPiece!=null) {
            var pos = this.bridge.game.pushDead(this.deadPiece);
            this.deadPiece.setPos(pos);
            this.deadPiece.visual.changePos(false);
            this.deadPiece.visual.placeInRoster();
        }
        this.returnFunc();
    }

    update(deltaTime) {
        if(this.deadPiece!=null)
            this.deadPiece.update(deltaTime);
    }
}