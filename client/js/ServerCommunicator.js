class ServerCommunicator {
    constructor() {
        this.socket = new WebSocket("ws://10.0.2.15:8001");   

        this.socket.onopen = this.globalOnOpen.bind(this);
        this.socket.onclose = this.globalOnClose.bind(this);
        this.socket.onerror = this.globalOnError.bind(this);
        this.socket.onmessage= this.globalOnMessage.bind(this);

        this.gameId = null;
        this.username = null;
        this.answerParser = new AnswerParser(); 
    }

    createAccount(username, password) {
        this.socket.onmessage = this.loginOnMessage.bind(this);;

        this.username = username;

        let request = requestReg(username, password);
        this.socket.send(request);
    }

    createAccountOnMessage(event) {
        try { 
            this.answerParser.parseReg(event.data);
            preGameHandler.executeCreateAccount(true);
        } catch( error ) {
            alert(error.message);
            preGameHandler.executeCreateAccount(false);
            //Couldn't reg
        }
    }

    login(username, password) {
        this.socket.onmessage = this.loginOnMessage.bind(this);

        this.username = username;

        let request = requestLogin(username, password);
        this.socket.send(request);
    }

    loginOnMessage(event) {
        try { 
            this.answerParser.parseLogin(event.data);
            preGameHandler.executeLogin(true);
        } catch( error ) {
            alert(error.message);
            preGameHandler.executeLogin(false);
            //Couldn't login
        }
    }

    listGames() {
        this.socket.onmessage = this.listGamesOnMessage.bind(this);

        let request = requestListGames();
        this.socket.send(request);
        //FIXME
    }

    listGamesOnMessage(event) {
        try {
            let games = this.answerParser.parseListGames(event.data);
            console.log(games);
            preGameHandler.listGames(games);
        } catch( error ) { 
            //DEBUG FIXME 
            alert(error.message);            
            //What?
        }
    }

    importFullGame() {
        //FIXME
    }

    move(x1,y1,x2,y2) {   
        this.socket.onmessage= this.moveOnMessage.bind(this);

        let request = requestGameMove(this.gameId,x1,y1,x2,y2);
        this.socket.send(request);
    }

    moveOnMessage(event) {
        try {
            let gameMoveAnswer = this.answerParser.parseGameMove(event.data);
            if( gameMoveAnswer.isNext ) {
                gameBridge.executeMove();
            }
            else if( !gameMoveAnswer.isNext ) {
                gameBridge.readyPromote();
            }
        } catch( error ) { 
            //DEBUG FIXME 
            console.log(error);
            alert(error.message);            
            //MOVE IS NOT ACCEPTED BY SERVER BUT IS ACCEPTED BY CLIENT. CLIENT IS CORRUPTED!
            this.importFullGame();
        }
    }

    setOtherTurn() {
        this.socket.onmessage= this.setOtherTurnOnMessage.bind(this);

        //this.socket.send(something?);
    }

    setOtherTurnOnMessage(event) {
        try {
            let otherTurnAnswer = this.answerParser.parseGameTurn(event.data);
            if ( otherTurnAnswer.white == gameBridge.getWhite() ) {
                //What Do ? Turn did not change FIXME
            }
            else {
                gameBridge.setMyTurn();
            }
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

    createGame(white,otherUser) {

        this.socket.onmessage = this.createGameOnMessage.bind(this);

        this.newGameInfo = {white: white, otherUser: otherUser};

        if(white) {
            var request = requestNewGame(this.username, otherUser);
        }
        else {
            var request = requestNewGame(otherUser, this.username);
        }
        this.socket.send(request);
    }

    createGameOnMessage(event) {
        try {
            let game = this.answerParser.parseNewGame(event.data);
            //game should return gameId FIXME
            this.gameId = 0;
            startChessGame(this.gameId,this.newGameInfo.white,this.newGameInfo.otherUser);
        } catch( error ) { 
            //DEBUG FIXME 
            console.log(error.message);
            alert(error.message);            
            //Shouldn't happen
        }
    }

    joinGame(gameId) {
        this.socket.onmessage = this.joinGameOnMessage.bind(this);

        let request = requestGameStatus(gameId);
        this.socket.send(request);
    }

    joinGameOnMessage(event) {
        //FIXME
    }
}