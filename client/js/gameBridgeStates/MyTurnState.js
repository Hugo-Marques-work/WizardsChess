class MyTurnState extends GameBridgeState {

    constructor(gameBridge) {
        super(gameBridge);
    }
    
    handleMouseClick() {
        if(this.bridge.waitingForResponse) {
            //Can do something here
            return;
        }

        if(this.bridge.intersects.pieces.length>0) {

            var piece = this.bridge.intersects.pieces[0].object.parent;
            console.log(piece);
            if(this.bridge.move.from == null ) {
                //if(this.bridge.intersects.pieces[0].white == this.bridge.game.meWhite) {
                    this.bridge.move.from = piece;
                    console.log(this.bridge.move);
                    this.bridge.move.from.children[0].material.setValues( { color: 0xffff00});
                //}
            }
            else {
                this.bridge.move.toPos = piece.getBoardPos();
                
                //Should handle a plethora of stuff! for example same color
                //Need a connection between visual and logic
                //if click on NON-POSSIBLE-MOVE then should be new from) TO THINK LATER ( IF I CLICK ON ANOTHER PIECE I MIGHT WANT TO CHOOSE IT)
                this.bridge.readyMove();
                console.log(this.move);

            }

        }
        else if(this.bridge.intersects.tiles.length>0) {
            //Only check board tiles if no piece clicked

            var tile = this.bridge.intersects.tiles[0].object.parent;

            if(this.bridge.move.from == null ) {
                var boardPos = tile.getBoardPos();
                this.bridge.move.from = this.bridge.game.getCell(boardPos);

                if(this.bridge.move.from != null) {
                    if(this.bridge.move.from.white != this.bridge.game.meWhite) {
                        
                        this.bridge.move.from = null;
                    }
                }
            }
            else {
                this.bridge.move.toPos = tile.getBoardPos();
                
                console.log(this.bridge.move);
                this.bridge.readyMove();
                console.log(this.bridge.move);

            }
        }
    }
}