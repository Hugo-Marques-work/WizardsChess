const errorMessages = {
    '':""
}

class ServerCommunicator {
    constructor(addr, bLogin, user, pass, gameId, onDraw, onWin, onDrop) {
        this.socket = new WebSocket(addr);
        this.canUse = false;
        this.bLogin = bLogin;
        this.gameId = gameId;
        
        this.onDraw = onDraw;
        this.onWin = onWin;
        this.onDrop = onDrop;
        
        if (this.bLogin == true) {
            this.user = user;
            this.pass = pass;
        }
        
        this.socket.onopen = this.globalOnOpen.bind(this);
        this.socket.onclose = this.globalOnClose.bind(this);
        this.socket.onerror = this.globalOnError.bind(this);
        this.socket.onmessage= this.globalOnMessage.bind(this);
        this.onGameStatusCompleteBind = this.onGameStatusComplete.bind(this);
        
        this.answerParser = new AnswerParser(); 
    }
    
    createAccount(username, password, func) {
        this.onCreateAccountComplete = func;
        this.socket.onmessage = this.createAccountOnMessage.bind(this);

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
    
    onGameStatusComplete(event) {
        try { 
            var answer = this.answerParser.parseGameStatus(event.data);
            switch (answer.status) {
                case 'WIN_STATE':
                    this.onWin(this.gameId, answer.winner);
                    break;
                case 'DROP_STATE':
                    this.onDrop(this.gameId);
                    break;
                case 'DRAW_STATE':
                    this.onDraw(this.gameId);
                    break;
            }
            this.gameBridge.waitingForResponse = false;
        } catch(error) {
            console.log(error);
        }
    }
    
    readyGameStatus (gameBridge) {
        this.gameBridge = gameBridge;
        this.socket.onmessage = this.onGameStatusCompleteBind;
        let request = requestGameStatus(this.gameId);
        this.socket.send(request);
    }
    
    //when login on open
    onLoginCompleteHandler(sucess) {
        if (!sucess) {
            console.log('Login for gameBridge: error.');
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
            this.canUse = true;
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
            if (error instanceof ErrorAnswerException)
                this.onMoveComplete(error);
            console.log(error);
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
            console.log(error.message);
        }
    }

    globalOnOpen(event) {
        console.log("Connection has opened");
        if (this.bLogin) {
            this.login (this.user, this.pass, this.onLoginCompleteHandler);
        }
    }
    
    drop (gameId, dropHandler) {
        var request = requestDrop(gameId);
        this.dropHandler = dropHandler;
        this.socket.onmessage = this.dropOnMessage.bind(this);
        this.socket.send(request);
    }
    
    dropOnMessage(event) {
        try {
            this.answerParser.parseGameDrop(event.data);
            this.gameId = 0;
            this.dropHandler(true);
        } catch (error) { 
            this.dropHandler(false);
            console.log(error);
        }
    }

    globalOnMessage(event) {
        console.log(event);
        return false;
    }

    globalOnClose(event) {
        console.log("Connection has closed");
    }

    globalOnError(event) {
        console.log("Error sendind message to server");
    }
    
    closeSocket () {
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
            this.gameId = 0;
            this.onCreateGameComplete(this.gameId, this.newGameInfo);
        } catch( error ) { 
            alert(error.message);
            console.log(error.message);
        }
    }

    importGame(gameId, func) {
        if (this.canUse != true) {
            setTimeout(this.importGame.bind(this, gameId, func), 2000);
        } else {
            this.importGameComplete = func;
            this.socket.onmessage = this.importGameOnMessage.bind(this);
            let request = requestImportGame(gameId);
            console.log(request);
            this.socket.send(request);
        }
    }

    importGameOnMessage(event) {
        try {
            debugger;
            let importedGameInfo = this.answerParser.parseImportGame(event.data);
            this.importGameComplete(importedGameInfo);
        } catch (error) {
            alert(error.message);
            console.log(error.message);
        }
    }
}
