class ServerCommunicator {
    constructor(addr) {
        this.socket = new WebSocket(addr);   

        this.socket.onopen = this.globalOnOpen.bind(this);
        this.socket.onclose = this.globalOnClose.bind(this);
        this.socket.onerror = this.globalOnError.bind(this);
        this.socket.onmessage= this.globalOnMessage.bind(this);

        this.gameId = null;
        this.username = null;
        this.answerParser = new AnswerParser(); 
    }
    
    createAccount(username, password, func) {
        this.onCreateAccountComplete = func;
        this.socket.onmessage = this.createAccountOnMessage.bind(this);;

        this.username = username;

        let request = requestReg(username, password);
        this.socket.send(request);
    }

    createAccountOnMessage(event) {
        try { 
            this.answerParser.parseReg(event.data);
            this.onCreateAccountComplete(true); 
        } catch(error) {
            alert(error.message);
            this.onCreateAccountComplete(false);
            console.log(error.message);
            //Couldn't reg
        }
    }

    login(username, password, func) {
        this.onLoginComplete = func;
        this.socket.onmessage = this.loginOnMessage.bind(this);

        this.username = username; 

        let request = requestLogin(username, password);
        this.socket.send(request);
    }

    loginOnMessage(event) {
        try { 
            this.answerParser.parseLogin(event.data);
            this.onLoginComplete(true);
        } catch(error) {
            alert(error.message);
            console.log(error.message);
            this.onLoginComplete(false);
            //Couldn't login
        }
    }

    listGames(func) {
        this.onListGamesComplete = func;
        this.socket.onmessage = this.listGamesOnMessage.bind(this);

        let request = requestListGames();
        this.socket.send(request);
        //FIXME
    }

    listGamesOnMessage(event) {
        try {
            let games = this.answerParser.parseListGames(event.data);
            console.log(games);
            this.onListGamesComplete(games);
        } catch( error ) { 
            //DEBUG FIXME 
            alert(error.message);            
            //What?
        }
    }

    /*
    importGame(gameId) {
        //FIXME
        this.socket.onmessage = this.importGameOnMessage.bind(this);

        let request = requestImportGame(gameId);
        this.socket.send(request);
    }

    importGameOnMessage(event) {
        try{
            let game = this.answerParser.parseImportGame(event.data);
            
                        //FIXME?

        } catch ( error ) {
            console.log(error.message);
            alert(error.message);
        }
    }*/

    move(gameId,x1,y1,x2,y2, func) {   
        this.onMoveComplete = func;
        this.socket.onmessage= this.moveOnMessage.bind(this);

        let request = requestGameMove(gameId,x1,y1,x2,y2);
        this.socket.send(request);
    }

    moveOnMessage(event) {
        try {
            let gameMoveAnswer = this.answerParser.parseGameMove(event.data);
            
            this.onMoveComplete(gameMoveAnswer);
        } catch( error ) { 
            //DEBUG FIXME 
            console.log(error);
            alert(error.message);  
                      
            //MOVE IS NOT ACCEPTED BY SER 
            //this.preGameHandler.cancelRequest();
            //this.importFullGame();
        }
    }

    setOtherTurn(gameBridge,func) {
        console.log(gameBridge);
        this.setOtherTurnComplete = func;
        
        this.socket.onmessage= this.setOtherTurnOnMessage.bind(this);

        this.readyToAskOtherTurn = true;

        //this.socket.send(something?);
    }

    askOtherTurn(gameId) {
        //FIXME WHAT IF CHANGE!!!
        if(this.readyToAskOtherTurn == true) {
            this.readyToAskOtherTurn = false;
            
            let request = requestGameTurn(gameId);
            this.socket.send(request);
        }
    }

    setOtherTurnOnMessage(event) {
        try {
            let otherTurnAnswer = this.answerParser.parseGameTurn(event.data);
            
            this.setOtherTurnComplete(otherTurnAnswer);
        } catch( error ) {
            alert(error.message);

        }
        this.readyToAskOtherTurn = true;
        console.log("otherTurnNotYet");
    }

    askLastMove(gameId, func) {
        this.askLastMoveComplete = func;
        this.socket.onmessage= this.askLastMoveOnMessage.bind(this);

        let request = requestGameLastMove(gameId);
        this.socket.send(request);
    }

    askLastMoveOnMessage(event) {
        try {
            let gameLastMove = this.answerParser.parseGameLastMove(event.data);
            
            this.askLastMoveComplete(gameLastMove);
        } catch( error ) {
            alert(error.message);

        }
    }

    globalOnOpen(event) {
        console.log(event);
        console.log("SOCKET HAS OPENED");
    }

    globalOnMessage(event) {
        console.log(event);
        return false;
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

    createGame(white, otherUser, func) {
        this.onCreateGameComplete = func;
        this.socket.onmessage = this.createGameOnMessage.bind(this);
        this.newGameInfo = {white: white, otherUser: otherUser};
        var request = requestNewGame(otherUser, white);
        this.socket.send(request);
    }

    createGameOnMessage(event) {
        try {
            let newGame = this.answerParser.parseNewGame(event.data);
            //game should return gameId FIXME
            this.gameId = 0;
            this.onCreateGameComplete(this.gameId, this.newGameInfo);
        } catch( error ) { 
            //FIXME - wtf??? preGameHandler.cancelRequest();
            //DEBUG FIXME 
            alert(error.message);            
            //Shouldn't happen
        }
    }

    importGame(gameId, func) {
        this.importGameComplete = func;
        this.socket.onmessage = this.importGameOnMessage.bind(this);

        let request = requestImportGame(gameId);
        console.log(request);
        this.socket.send(request);
    }

    importGameOnMessage(event) {
        //try {
            let importedGameInfo = this.answerParser.parseImportGame(event.data);

            this.importGameComplete(importedGameInfo);
        /*} catch( error ) {
            preGameHandler.cancelRequest();
            console.log(error.message);
            alert(error.message);
        }*/
    }
}
