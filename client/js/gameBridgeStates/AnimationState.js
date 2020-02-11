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
        if(this.bridge.game.enPassantLastMove!=null) {
            console.log("DifferentCheck");
            this.move.from.changePos(true);
            this.deadPiece = this.bridge.game.enPassantLastMove.piece;
            this.bridge.game.getCellVisual(this.deadPiece.pos).killPiece();
            console.log(this.deadPiece);
            this.deadPiece.dieVisual();
        }
        else if(this.bridge.game.castlingLastMove!=null) {
            this.bridge.game.castlingLastMove.rook.visual.changePos(true);
            this.bridge.game.castlingLastMove.king.visual.changePos(true);
        }
        else {
            console.log("CHECK");
            this.normalAnimation();
        }
    }

    normalAnimation() {
        this.move.from.changePos(true);

        if(this.deadPiece!=null) {
            
            console.log(this.deadPiece);
            console.log(this.move.toPos);
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