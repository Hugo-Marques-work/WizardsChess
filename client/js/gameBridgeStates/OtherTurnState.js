class OtherTurnState extends GameBridgeState {

    constructor(gameBridge) {
        super(gameBridge);
        this.setRightMenu();
    }


    setRightMenu() {
        document.getElementById("rightMenuReady").innerHTML = "Not Your Turn";
        document.getElementById("rightMenuReady").style.color = "Red";

        document.getElementById("rightMenuTurnCount").innerHTML = 
        parseInt(document.getElementById("rightMenuTurnCount").innerHTML) + 1;
        this.bridge.currentTurn++;

    }

    refreshRightMenu() {
        document.getElementById("rightMenuReady").innerHTML = "Not Your Turn";
        document.getElementById("rightMenuReady").style.color = "Red";
        document.getElementById("rightMenuTurnCount").innerHTML = this.bridge.currentTurn;
    }

    handleMouseClick() {
        //Check mouse click on drop, draw, and giveUp(same thing?)
    }
}