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

            if(this.bridge.move.from == null ) {
                if(this.bridge.intersects.pieces[0].white == this.bridge.game.meWhite) {
                    this.bridge.move.from = this.bridge.intersects.pieces[0];
                }
            }
            else {
                this.bridge.move.toPos = this.bridge.intersects.pieces[0].getBoardPos();
                
                //Should handle a plethora of stuff! for example same color
                //Need a connection between visual and logic
                //if click on NON-POSSIBLE-MOVE then should be new from) TO THINK LATER ( IF I CLICK ON ANOTHER PIECE I MIGHT WANT TO CHOOSE IT)
                this.bridge.readyMove()
            }

        }
        else if(this.bridge.intersects.tiles.length>0) {
            //Only check board tiles if no piece clicked
            if(this.bridge.move.from == null ) {

                var boardPos = this.bridge.intersects.tiles[0].getBoardPos();
                this.bridge.move.from = this.bridge.game.getCell(boardPos);

                if(this.bridge.move.from != null) {
                    if(this.bridge.move.from.white != this.bridge.game.meWhite) {
                        
                        this.bridge.move.from = null;
                    }
                }
            }
            else {
                this.bridge.move.toPos = this.bridge.intersects.tiles[0].getBoardPos();

                this.bridge.readyMove();
            }
        }
    }
}