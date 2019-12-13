class PawnPiece extends Piece{
    constructor(id,white,pos,g,forward) {
        var actualPos = pos.clone();
        super(id,white,actualPos,g,forward);
        this.visual = new PawnPieceVisual(this);

        this.MIN_POS_Y = 0;
        this.MAX_POS_Y = 7;

        this.hasMoved = false;
    }

    getValidMoves() {
        let yToAdd = this.forward ? 1 : -1;
        let valid =[];
        try {
            this.pushIfAvailable( valid, new Position(this.pos.x , 
                this.pos.y + yToAdd), false);

            if(this.hasMoved == false) {
                this.pushIfAvailable( valid,new Position(this.pos.x , 
                    this.pos.y + yToAdd*2), false);
            }

        } catch(err) {
            return valid;
        }

        try {
            this.pushIfAvailable(valid, new Position(this.pos.x+1 , 
                this.pos.y + yToAdd), true);

        } catch(err) { ; }

        try {
            this.pushIfAvailable(valid, new Position(this.pos.x-1 , 
                this.pos.y + yToAdd), true);

        } catch(err) { ; }

        console.log("Pawn");

        return valid;
    }

    setPos(pos) {
        if(! this.hasMoved ) {
            let lastPos = this.pos;
            super.setPos(pos);

            if(lastPos.y - this.pos.y == 2 || 
                lastPos.y - this.pos.y == -2) {
                
                if(lastPos.y - this.pos.y == 2) {
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
        this.visual.changePos();
        if(this.pos.y == this.MIN_POS_Y || 
            this.pos.y == this.MAX_POS_Y) {
            
            throw new PawnPromotionException(this);
        }
    }

    update(deltaTime) {
        this.visual.update(deltaTime);
    }

    die() {
        super.die();
        this.visual.die();
    }
}