class OtherTurnState extends GameBridgeState {

    constructor(gameBridge) {
        super(gameBridge);
        document.getElementById("rightMenuReady").innerHTML = "Not Your Turn";
        document.getElementById("rightMenuReady").style.color = "Red";

        document.getElementById("rightMenuTurnCount").innerHTML = 
        parseInt(document.getElementById("rightMenuTurnCount").innerHTML) + 1;
    }

    handleMouseClick() {
        //Check mouse click on drop, draw, and giveUp(same thing?)
    }
}