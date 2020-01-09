class PreGameHandler {
    constructor() {
        this.waiting = false; //NEXT THING FIXME
    }

    createAccount() {
        let username = document.getElementById("LoginScreenUsername").value;
        let password = document.getElementById("LoginScreenPassword").value;

        sCom.createAccount(username,password);
    }

    login() {
        let username = document.getElementById("LoginScreenUsername").value;
        let password = document.getElementById("LoginScreenPassword").value;

        sCom.login(username,password);
    }

    executeCreateAccount(success) {
        if(success) {
            this.hideLoginScreen();
            this.showGameListScreen();
        }
    }

    executeLogin(success) {
        if(success) {
            this.hideLoginScreen();
            this.showGameListScreen();
        }
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

            cellReadyToPlay.innerHTML = "";
            cellOpponent.innerHTML = gameInfo.otherUser;
            cellColor.innerHTML = gameInfo.isWhite;
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

    createGame() {
        this.hideCreateGame();
        let white = document.getElementById("CreateGameDetailsWhite").checked;
        let otherUser = document.getElementById("CreateGameDetailsOtherUser").value;
        this.clearPreGame();
        sCom.createGame(white, otherUser);
    }

    joinGame(gameId) {
        this.clearPreGame();
        sCom.joinGame(gameId);
    }

    clearPreGame() {
        document.getElementById("GameListScreen").hidden = true;
    }
}