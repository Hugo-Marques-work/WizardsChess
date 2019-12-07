class PawnPiece extends Piece{
    constructor(id,white,pos,g,forward) {
        super(id,white,pos,g,forward);
        this.visual = new PawnPieceVisual();

        this.MIN_POS_Y = 0;
        this.MAX_POS_Y = 7;

        this.hasMoved = false;
    }

    getValidMoves() {
        let yToAdd = this.forward ? 1 : -1;
        let valid =[];
        try {
            this.pushIfAvailable( valid, Position(this.myPos.x , 
                this.myPos.y + yToAdd), false);

            if(this.hasMoved == false) {
                this.pushIfAvailable( valid,new Position(this.myPos.x , 
                    this.myPos.y + yToAdd*2), false);
            }

        } catch(err) {
            return valid;
        }

        try {
            this.pushIfAvailable(valid, new Position(this.myPos.x+1 , 
                this.myPos.y + yToAdd), true);

        } catch(err) { ; }

        try {
            this.pushIfAvailable(valid, new Position(this.myPos.x-1 , 
                this.myPos.y + yToAdd), true);

        } catch(err) { ; }
    
        return valid;
    }

    setPos(pos) {
        if(! this.hasMoved ) {
            let lastPos = this.myPos;
            super.setPos(pos);

            if(lastPos.y - this.myPos.y == 2 || 
                lastPos.y - this.myPos.y == -2) {
                
                if(lastPos.y - this.myPos.y == 2) {
                    lastPos.y--;
                }
                else {
                    lastPos.y++;
                }

                this.game.fillEnPassant(lastPos,this);
            }
        }
        else {
            super.setPos(pos);
        }

        this.hasMoved = true;

        //FIXME (NEEDED?????)
        if(this.myPos.y == this.MIN_POS_Y || 
            this.myPos.y == this.MAX_POS_Y) {
            
            throw new PawnPromotionException(this);
        }
    }

    getForward() { return this.forward; }

    update(deltaTime) {
        this.visual.update(deltaTime);
    }
}