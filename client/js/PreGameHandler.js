class PreGameHandler {
    constructor() {
        this.waiting = false; //NEXT THING FIXME
    }

    createAccount() {
        this.disableInput();
        if(this.waiting == true) return;
        this.waiting = true;

        let username = document.getElementById("LoginScreenUsername").value;
        let password = document.getElementById("LoginScreenPassword").value;

        sCom.createAccount(username,password);
    }

    login() {
        this.disableInput();
        if(this.waiting == true) return;
        this.waiting = true;
        
        let username = document.getElementById("LoginScreenUsername").value;
        let password = document.getElementById("LoginScreenPassword").value;

        sCom.login(username,password);
    }

    disableInput() {
        document.getElementById("LoginScreenUsername").disabled = true;
        document.getElementById("LoginScreenPassword").disabled = true;
        document.getElementById("CreateAccount").disabled = true;
        document.getElementById("LoginAccount").disabled = true;   
    }

    enableInput() {
        document.getElementById("LoginScreenUsername").disabled = false;
        document.getElementById("LoginScreenPassword").disabled = false;
        document.getElementById("CreateAccount").disabled = false;
        document.getElementById("LoginAccount").disabled = false;   
    }

    executeCreateAccount(success) {
        if(success) {
            this.showAccountCreated("accountNumber");
        } 
        
        this.waiting = false;
        this.enableInput();
    }

    showAccountCreated(accNumber) {
        document.getElementById("AccountCreated").hidden = false;
        document.getElementById("AccountName").innerHTML = accNumber;
    }
    
    executeLogin(success) {
        if(success) {
            this.hideLoginScreen();
            this.showGameListScreen();
        } else {
            this.enableInput();
        }
        this.waiting = false;
    }

    hideLoginScreen() {
        document.getElementById("LoginScreen").hidden = true;
    }

    showGameListScreen() {
        document.getElementById("GameListScreen").hidden = false;
        //preGameHandler.listGames([new GameInfo("11111","SuperDudeXXX","White")]);
        //FIXME
        //FIXME
        sCom.listGames();
    }

    listGames(games) { 
        var table = document.getElementById("GameListTable");
        let listGameInfo = games.listGameInfo;
        for(let i in listGameInfo) {
            let gameInfo = listGameInfo[i];
            let row = table.insertRow(/*i+*/1);
            let string = "gameId-" + gameInfo.gameId ;
            row.classList.add( string );
            row.setAttribute("onclick", "preGameHandler.joinGame("
                + gameInfo.gameId + ")" );
            let k = 0;
            let cellReadyToPlay = row.insertCell(k++);
            let cellOpponent = row.insertCell(k++);
            let cellColor = row.insertCell(k++);
            let cellGameId = row.insertCell(k++);
            let cellTurnNumber = row.insertCell(k++);

            cellReadyToPlay.innerHTML = gameInfo.isWhite == gameInfo.isWhiteTurn ? "Ready To Play" : "Not Ready";
            cellOpponent.innerHTML = gameInfo.otherUser;
            cellColor.innerHTML = gameInfo.isWhite ? "White" : "Black";
            cellGameId.innerHTML = gameInfo.gameId;
            cellTurnNumber.innerHTML = "";
        }
    }


    showCreateGame() {
        document.getElementById("CreateGameDetails").hidden = false;
    }

    hideCreateGame() {
        document.getElementById("CreateGameDetails").hidden = true;
    }

    disableCreateGame() {
        document.getElementById("CreateGameButton").disabled = true;   
        document.getElementById("CreateGameDetailsWhite").disabled = true;
        document.getElementById("CreateGameDetailsBlack").disabled = true;
        document.getElementById("CreateGameDetailsOtherUser").disabled = true;
        document.getElementById("CancelCreateGame").disabled = true;   
    }

    enableCreateGame() {
        document.getElementById("CreateGameButton").disabled = false;
        document.getElementById("CreateGameDetailsWhite").disabled = false;
        document.getElementById("CreateGameDetailsBlack").disabled = false;
        document.getElementById("CreateGameDetailsOtherUser").disabled = false;
        document.getElementById("CancelCreateGame").disabled = false;  
    }

    createGame() {
        if(this.waiting == true) return;
        this.waiting = true;

        this.disableCreateGame();
        let white = document.getElementById("CreateGameDetailsWhite").checked;
        let otherUser = document.getElementById("CreateGameDetailsOtherUser").value;
        sCom.createGame(white, otherUser);
    }

    executeCreateGame(gameId,newGameInfo) {
        this.clearPreGame();
        startChessGame(gameId,newGameInfo.white,newGameInfo.otherUser);
    }

    joinGame(gameId) {        
        if(this.waiting == true) return;
        this.waiting = true;

        this.clearPreGame(); //<- FIXME
        sCom.importGameAndJoin(gameId);
    }

    executeImportGameAndJoin(importedGameInfo) {
        console.log("Importing game");
        //FIXME IMPORT GAME! AND JOIN!
        joinChessGame(importedGameInfo.importedGame.gameId, importedGameInfo.imWhite,
            importedGameInfo.otherUser, importedGameInfo.importedGame);
    }

    clearPreGame() {
        document.getElementById("GameListScreen").hidden = true;
    }

    cancelRequest() {
        this.enableCreateGame();
        this.waiting = false;
    }
}