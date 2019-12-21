class OtherTurnState extends GameBridgeState {

    constructor(gameBridge) {
        super(gameBridge);
        this.gameBridge.setOtherTurn();
    }

    handleMouseClick() {
        //Check mouse click on drop, draw, and giveUp(same thing?)
    }
}