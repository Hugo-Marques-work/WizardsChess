class MyTurnState extends GameBridgeState {

    constructor(gameBridge) {
        super(gameBridge);
        this.lastChosenPieceMat = null;
        document.getElementById("rightMenuReady").innerHTML = "Your Turn";
        document.getElementById("rightMenuReady").style.color = "Green"
        document.getElementById("rightMenuTurnCount").innerHTML = 
        parseInt(document.getElementById("rightMenuTurnCount").innerHTML) + 1;
    }
    
    handleMouseClick() {
        if(this.bridge.waitingForResponse) {
            //Can do something here
            console.log("I'M WAITING FOR THE SERVER");
            return;
        }

        if(this.bridge.intersects.pieces.length>0) {

            var piece = this.bridge.intersects.pieces[0].object.userData.visual;
            if(this.bridge.move.from == null) {
                console.log(piece);
                console.log(this.bridge.intersects.pieces[0].object);
                if(piece.logic.white == this.bridge.imWhite) {
                    this.bridge.move.from = piece;
                    this.bridge.move.from.setHighlight(true);
                    this.bridge.game.getCellVisual(this.bridge.move.from.getBoardPos()).setHighlight(true);

                    this.enPassantHighlight = null;
                    for(let i in this.bridge.game.getEnPassantOrigin() ) {
                        var pos = this.bridge.game.getEnPassantOrigin()[i];
                        if( pos.equal(piece.getBoardPos())) {
                            this.enPassantHighlight = {dest: this.bridge.game.getEnPassantDest(), piece: this.bridge.game.getEnPassantPiece()};
                            this.bridge.game.getCellVisual(this.enPassantHighlight.dest).setKillable();
                            this.enPassantHighlight.piece.visual.setKillable();
                        }
                    }

                    this.validCastling = null;
                    let pieceKing = this.bridge.game.getKing(piece.logic.white);
                    if(piece.logic.pos.equal(pieceKing.pos)) {
                        this.validCastling = piece.logic.getValidCastling();
                    }

                    for(let pos in this.validCastling) {
                        this.bridge.game.getCellVisual(this.validCastling[pos]).setMovable(this.bridge.move.from.logic.white);
                    }

                    this.movableHighlighted = this.bridge.move.from.logic.getValidMoves();
                    for(let pos in this.movableHighlighted) {
                        this.bridge.game.getCellVisual(this.movableHighlighted[pos]).setMovable(piece.logic.white);
                    }
                }
            } 
            else {
                this.bridge.move.toPos = piece.getBoardPos();
                this.bridge.move.from.setHighlight(false);
                this.bridge.game.getCellVisual(this.bridge.move.from.getBoardPos()).setHighlight(false);
                for(let pos in this.movableHighlighted) {
                    this.bridge.game.getCellVisual(this.movableHighlighted[pos]).setHighlight(false);
                }

                if(this.enPassantHighlight!=null) {
                    this.bridge.game.getCellVisual(this.enPassantHighlight.dest).setHighlight(false);
                    this.enPassantHighlight.piece.visual.setHighlight(false);
                }

                if(this.validCastling!=null) {
                    for(let pos in this.validCastling) {
                        this.bridge.game.getCellVisual(this.validCastling[pos]).setHighlight(false);
                    }
                }
                //Should handle a plethora of stuff! for example same color
                //Need a connection between visual and logic
                //if click on NON-POSSIBLE-MOVE then should be new from) TO THINK LATER ( IF I CLICK ON ANOTHER PIECE I MIGHT WANT TO CHOOSE IT)
                this.bridge.readyMove();

            }

        }
        else if(this.bridge.intersects.tiles.length>0) {
            //Only check board tiles if no piece clicked

            var tile = this.bridge.intersects.tiles[0].object.userData.visual;
            if(this.bridge.move.from == null ) {
                var boardPos = tile.getBoardPos();
                this.bridge.move.from = this.bridge.game.getCell(boardPos);

                if(this.bridge.move.from != null) {
                    if(this.bridge.move.from.white == this.bridge.imWhite) {
                    /*if(this.bridge.move.from.white != this.bridge.game.meWhite) {
                        
                        this.bridge.move.from = null;
                    }
                    else {*/
                        this.bridge.move.from = this.bridge.move.from.visual;
                        this.bridge.move.from.setHighlight(true);
                        tile.setHighlight(true); 
                        

                        this.enPassantHighlight = null;
                        for(let i in this.bridge.game.getEnPassantOrigin() ) {
                            var pos = this.bridge.game.getEnPassantOrigin()[i];
                            if( pos.equal(this.bridge.move.from.getBoardPos())) {
                                this.enPassantHighlight = {dest: this.bridge.game.getEnPassantDest(), piece: this.bridge.game.getEnPassantPiece()};
                                this.bridge.game.getCellVisual(this.enPassantHighlight.dest).setKillable();
                                this.enPassantHighlight.piece.visual.setKillable();
                            }
                        }

                        this.validCastling = null;
                        let pieceKing = this.bridge.game.getKing(this.bridge.move.from.logic.white);
                        if(this.bridge.move.from.logic.pos.equal(pieceKing.pos)) {
                            this.validCastling = this.bridge.move.from.logic.getValidCastling();
                        }
                        for(let pos in this.validCastling) {
                            this.bridge.game.getCellVisual(this.validCastling[pos]).setMovable(this.bridge.move.from.logic.white);
                        }

                        this.movableHighlighted = this.bridge.move.from.logic.getValidMoves();
                        for(let pos in this.movableHighlighted) {
                            this.bridge.game.getCellVisual(this.movableHighlighted[pos]).setMovable(this.bridge.move.from.logic.white);
                        }

                        //this.bridge.move.from.children[0].material.setValues( { transparent: true, opacity: 0.5});

                    }
                    else {
                        this.bridge.move.from = null;
                    }
                }
            }
            else {
                this.bridge.move.toPos = tile.getBoardPos();
                
                this.bridge.move.from.setHighlight(false);
                this.bridge.game.getCellVisual(this.bridge.move.from.getBoardPos()).setHighlight(false);
                for(let pos in this.movableHighlighted) {
                    this.bridge.game.getCellVisual(this.movableHighlighted[pos]).setHighlight(false);
                }

                if(this.enPassantHighlight!=null) {
                    this.bridge.game.getCellVisual(this.enPassantHighlight.dest).setHighlight(false);
                    this.enPassantHighlight.piece.visual.setHighlight(false);
                }

                if(this.validCastling!=null) {
                    for(let pos in this.validCastling) {
                        this.bridge.game.getCellVisual(this.validCastling[pos]).setHighlight(false);
                    }
                }
                //this.bridge.move.from.children[0].material.setValues( { opacity: 1});

                this.bridge.readyMove();

            }
        }
    }
}