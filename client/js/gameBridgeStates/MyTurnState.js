class MyTurnState extends GameBridgeState {

    constructor(gameBridge) {
        super(gameBridge);
        this.lastChosenPieceMat = null;
    }
    
    handleMouseClick() {
        if(this.bridge.waitingForResponse) {
            //Can do something here
            console.log("I'M WAITING FOR THE SERVER");
            return;
        }

        if(this.bridge.intersects.pieces.length>0) {

            var piece = this.bridge.intersects.pieces[0].object.parent;
            if(this.bridge.move.from == null) {
                //if(this.bridge.intersects.pieces[0].white == this.bridge.game.meWhite) {
                    this.bridge.move.from = piece;
                    this.bridge.move.from.setHighlight(true);
                    this.bridge.game.getCellVisual(this.bridge.move.from.getBoardPos()).setHighlight(true);
                    this.movableHighlighted = this.bridge.move.from.logic.getValidMoves();
                    for(let pos in this.movableHighlighted) {
                        this.bridge.game.getCellVisual(this.movableHighlighted[pos]).setMovable();
                    }
                //}
            }
            else {
                this.bridge.move.toPos = piece.getBoardPos();
                this.bridge.move.from.setHighlight(false);
                this.bridge.game.getCellVisual(this.bridge.move.from.getBoardPos()).setHighlight(false);
                for(let pos in this.movableHighlighted) {
                    this.bridge.game.getCellVisual(this.movableHighlighted[pos]).setHighlight(false);
                }

                //Should handle a plethora of stuff! for example same color
                //Need a connection between visual and logic
                //if click on NON-POSSIBLE-MOVE then should be new from) TO THINK LATER ( IF I CLICK ON ANOTHER PIECE I MIGHT WANT TO CHOOSE IT)
                this.bridge.readyMove();

            }

        }
        else if(this.bridge.intersects.tiles.length>0) {
            //Only check board tiles if no piece clicked

            var tile = this.bridge.intersects.tiles[0].object.parent;

            if(this.bridge.move.from == null ) {
                var boardPos = tile.getBoardPos();
                this.bridge.move.from = this.bridge.game.getCell(boardPos);

                if(this.bridge.move.from != null) {
                    /*if(this.bridge.move.from.white != this.bridge.game.meWhite) {
                        
                        this.bridge.move.from = null;
                    }
                    else {*/
                        this.bridge.move.from = this.bridge.move.from.visual;
                        this.bridge.move.from.setHighlight(true);
                        tile.setHighlight(true); 
                        
                        this.movableHighlighted = this.bridge.move.from.logic.getValidMoves();
                        for(let pos in this.movableHighlighted) {
                            this.bridge.game.getCellVisual(this.movableHighlighted[pos]).setMovable();
                        }

                        //this.bridge.move.from.children[0].material.setValues( { transparent: true, opacity: 0.5});

                    //}
                }
            }
            else {
                this.bridge.move.toPos = tile.getBoardPos();
                
                this.bridge.move.from.setHighlight(false);
                this.bridge.game.getCellVisual(this.bridge.move.from.getBoardPos()).setHighlight(false);
                for(let pos in this.movableHighlighted) {
                    this.bridge.game.getCellVisual(this.movableHighlighted[pos]).setHighlight(false);
                }

                //this.bridge.move.from.children[0].material.setValues( { opacity: 1});

                this.bridge.readyMove();

            }
        }
    }
}