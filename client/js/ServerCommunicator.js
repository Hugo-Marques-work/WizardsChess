class ServerCommunicator {
    constructor() {
        this.socket = new WebSocket("wss://javascript.info");        
        this.socket.onopen = this.globalOnOpen(event);
        this.socket.onclose = this.globalOnClose(event);
        this.socket.onerror = this.globalOnError(event);

    }

    login() {
        
    }
    //Add websockets
    move() {   
        /*To be removed*/     
        gameBridge.executeMove();
        return;
        /*Until here*/
        //if(receivedMessage)
        this.socket.onmessage= this.moveOnMessage(e);
    }

    moveOnMessage(event) {
        let parser = new Parser(event.data);
        let moveAccepted = false;
        let word = parser.readString();
        //Deal with word and string

        //....

        if(moveAccepted == true) {
            gameBridge.executeMove();
        }
        else {
            //MOVE IS NOT ACCEPTED BY SERVER BUT IS ACCEPTED BY CLIENT. CLIENT IS CORRUPTED!
        }
    }

    globalOnOpen(event) {
        console.log("SOCKET HAS OPENED");
    }
    globalOnClose(event) {
        alert("Connection has closed");
    }

    globalOnError(event) {
        alert("Error sendind message to server");
    }
    
    drop() {
        this.socket.close();
    }

    draw() {

    }
}