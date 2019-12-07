class Piece {
    constructor(id,white,pos,g,forward) {
        if(id==undefined) {
            this.id = 0;
            this.white = true;
            this.pos = new Position(0,0);
            this.game = null;
            this.forward = true;
        }
        else {
            this.id = id;
            this.white = white;
            this.pos = pos;
            this.game = g;
            this.forward = forward;
        }

        this.alive = true;
    }

    getValidMoves() {
        //VIRTUAL
        return null;
    }

    validateMove(dest) {
        for(let pos in this.getValidMoves)
        {
            if(pos.x = dest.x && pos.y == dest.y)
                return true;
        }
        return false;
    }

    set(id,white,pos,g,forward)
    {
        this.id = id;
        this.white = white;
        this.pos = pos;
        this.game = g;
        this.forward = forward;
    }

    //if enemyInArea is undefined returns true if there's a piece on 
    // the destination
    pushIfAvailable(valid, pos, enemyInArea) {
        if( enemyInArea === undefined ) {
            let piece = this.game.getCell( pos );

            if( piece != null && piece.white != this.white) {
                valid.push(piece);
            }
            
            return piece != null;
        }

        if( enemyInArea ) {
            let piece = this.game.getCell( pos );
            
            if( piece != null && piece.white != this.white) {
                valid.push( pos );
            }
        }

        else {
            let piece = this.game.getCell( pos );
                    
            if(piece == null) {
                valid.push( pos );
            }
        }
    }

    setPos(pos) { this.pos = pos; }

    die() { this.alive = false; }

    getAlive() { return this.alive; }

    update() { 
        //VIRTUAL    
    }
}