class Screen {
    constructor (communicator) {
        this.communicator = communicator;
        this.state = new LoginState (this);
        this.state.show ();
    }
    
    event (dom, eventName) {
        this.state.event(dom, eventName);
    }
    
    setState (newState) {
        this.state.hide ();
        this.state = newState;
        this.state.show ();
    }
}

class Event {
    constructor (elementId, eventName, handler) {
        this.elementId = elementId;
        this.eventName = eventName;
        this.handler = handler;
    }
}

class ScreenState {
    constructor (screen) {
        this.screen = screen;
    }
    
    implemented () {
        //abstract: return list of Event
    }
    
    divId () {
        //abstract
    }
    
    event (dom, eventName) {
        var i, list = this.implemented();
        
        for (i in list) {
            if (list[i].eventName == eventName && list[i].elementId == dom.id) {
                list[i].handler(dom);
                return;
            }
        }
        
        console.log ("Could not handle event " + eventName + " for " + dom.id);
    }
    
    hide () {
        document.getElementById(this.divId()).style.display = "none";
    }
    
    show () {
        document.getElementById(this.divId()).style.display = "";
        this.onShow();
    }
}

class LoginState extends ScreenState {
    constructor (screen) {
        super(screen);
        
        this.createAccountCompleteFunc = LoginState.prototype.createAccountComplete.bind(this);
        this.loginCompleteFunc= LoginState.prototype.loginComplete.bind(this);
        
        this.listImplemented = [
            new Event ('loginScreenLogin', 'onmouseover', LoginState.prototype.mouseOver.bind(this)),
            new Event ('loginScreenCreateAccount', 'onmouseover', LoginState.prototype.mouseOver.bind(this)),
            new Event ('loginScreenLogin', 'onmouseout', LoginState.prototype.mouseOut.bind(this)),
            new Event ('loginScreenCreateAccount', 'onmouseout', LoginState.prototype.mouseOut.bind(this)),
            new Event ('loginScreenLogin', 'onclick', LoginState.prototype.doLogin.bind(this)),
            new Event ('loginScreenCreateAccount', 'onclick', LoginState.prototype.doCreateAccount.bind(this)),
            new Event ('loginScreenLogin', 'onmousedown', LoginState.prototype.mouseDown.bind(this)),
            new Event ('loginScreenCreateAccount', 'onmousedown', LoginState.prototype.mouseDown.bind(this)),
            new Event ('loginScreenLogin', 'onmouseup', LoginState.prototype.mouseUp.bind(this)),
            new Event ('loginScreenCreateAccount', 'onmouseup', LoginState.prototype.mouseUp.bind(this))
        ];
    }
    
    onShow() {
        
    }
    
    divId () {
        return "loginScreen";
    }
    
    implemented () {
        return this.listImplemented;
    }
    
    mouseOver (dom) {
        dom.style.fontWeight = "bold"; 
    }
    
    mouseOut (dom) {
        dom.style.fontWeight = "normal";
    }
    
    mouseDown (dom) {
        dom.style.backgroundColor = "rgb(150, 150, 150)"; 
    }
    
    mouseUp (dom) {
        dom.style.backgroundColor = "rgb(200, 200, 200)"; 
    }
    
    doLogin (dom) {
        var username = document.getElementById("loginScreenUsername").value;
        var password = document.getElementById("loginScreenPassword").value;
        
        this.showMessage("Waiting for server.");
        this.disableInput();
        
        this.screen.communicator.login(username, password, this.loginCompleteFunc);
    }
    
    doCreateAccount (dom) {
        var username = document.getElementById("loginScreenUsername").value;
        var password = document.getElementById("loginScreenPassword").value;
        
        this.showMessage("Waiting for server.");
        this.disableInput();
        
        this.screen.communicator.createAccount(username, password, this.createAccountCompleteFunc);
    }
    
    loginComplete (sucess) {
        if (sucess) {
            this.screen.setState(new LoggedState(this.screen));
        }
        else {
            this.enableInput();
            this.showMessage("Error in login.");
        }
    }
    
    createAccountComplete (sucess) {
        if (sucess)
            this.showMessage("Account created.");
        else
            this.showMessage("Error creating account.");
            
        this.enableInput();
    }
    
    disableInput() {
        document.getElementById("loginScreenUsername").disabled = true;
        document.getElementById("loginScreenPassword").disabled = true;
        document.getElementById("loginScreenCreateAccount").disabled = true;
        document.getElementById("loginScreenLogin").disabled = true;   
    }

    enableInput() {
        document.getElementById("loginScreenUsername").disabled = false;
        document.getElementById("loginScreenPassword").disabled = false;
        document.getElementById("loginScreenCreateAccount").disabled = false;
        document.getElementById("loginScreenLogin").disabled = false;   
    }

    showMessage (msg) {
        document.getElementById("loginScreenMessage").innerHTML = msg;
    }
}

class DivInfo {
    constructor (divId, entryId) {
        this.divId = divId;
        this.entryId = entryId;
    }
}

class PlayingGameInfo {
    constructor (gameBridge, menuIndex) {
        this.gameBridge = gameBridge;
        this.menuIndex = menuIndex;
    }
}

class LoggedState extends ScreenState {
    constructor (screen) {
        super(screen);
        
        this.divList = [
            new DivInfo ('loggedScreenListGames', 'loggedScreenEntryA'),
            new DivInfo ('loggedScreenNewGame', 'loggedScreenEntryB')
        ];
        
        this.currentDiv = 0;
        this.selectDiv(0);
        
        this.listGamesFunc = LoggedState.prototype.listGamesComplete.bind(this);
        this.createGameFunc = LoggedState.prototype.createGameComplete.bind(this);
        this.screen.communicator.listGames(this.listGamesFunc);
        
        this.gameBridge = null;
        this.gameMap = new Object();
        
        //FIXME tantos bind
        this.listImplemented = [
            new Event ('loggedScreenEntryA', 'onmouseover', LoggedState.prototype.mouseOver.bind(this)),
            new Event ('loggedScreenEntryB', 'onmouseover', LoggedState.prototype.mouseOver.bind(this)),
            new Event ('loggedScreenEntryA', 'onmouseout', LoggedState.prototype.mouseOut.bind(this)),
            new Event ('loggedScreenEntryB', 'onmouseout', LoggedState.prototype.mouseOut.bind(this)),
            new Event ('loggedScreenEntryA', 'onclick', LoggedState.prototype.myGames.bind(this)),
            new Event ('loggedScreenEntryB', 'onclick', LoggedState.prototype.newGame.bind(this)),
            new Event ('CreateGameButton', 'onclick', LoggedState.prototype.createGame.bind(this))
        ];
    }
    
    onShow () {
        var contentDiv = document.getElementById('loggedScreenContent');
        this.height = contentDiv.offsetHeight;
        this.width  = contentDiv.offsetWidth;
    }
    
    selectDiv (index) {
        var entry = document.getElementById(this.divList[this.currentDiv].entryId);
        entry.style.backgroundColor = "rgb(150,150,150, 0.0)";
        
        this.hideDiv(this.divList[this.currentDiv].divId);
        this.currentDiv = index;
        this.showDiv(this.divList[this.currentDiv].divId);
        
        entry = document.getElementById(this.divList[this.currentDiv].entryId);
        entry.style.backgroundColor = "rgb(150,150,150, 1.0)";
    }
    
    implemented () {
        return this.listImplemented;
    }
    
    divId () {
        return "loggedScreen";
    }
    
    createGameComplete (newGameId, gameInfo) {
        this.screen.communicator.listGames(this.listGamesFunc);
        document.getElementById("CreateGameMessage").innerHTML = "Game created.";
    }
    
    listGamesComplete (games) {
        var table = document.getElementById("loggedScreenGameList");
        this.games = games;
        
        if (games.listGameInfo.length > 0) {
            table.innerHTML = "<tr><th> Ready to play</th><th> Opponent </th><th> Your color</th><th> Game ID</th><th> Turn Number</th></tr>";
        
            for(let i in games.listGameInfo) {
                let gameInfo = games.listGameInfo[i];
                let row = table.insertRow(1);
                let string = "gameId-" + gameInfo.gameId ;
                row.classList.add( string );
                row.classList.add( "gameListRow" );
                row.setAttribute("onclick", "screen.state.joinGame(" + gameInfo.gameId + ")");
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
                cellTurnNumber.innerHTML = gameInfo.turnCount;
            }
            
            if (games.listGameInfo.length == 1)
                document.getElementById("loggedScreenGameCount").innerHTML = "Total: " + games.listGameInfo.length + " game." ;
            
            else
                document.getElementById("loggedScreenGameCount").innerHTML = "Total: " + games.listGameInfo.length + " games." ;
        }
        else
            document.getElementById("loggedScreenGameCount").innerHTML = "You are not playing games. Create one!";
    }
    
    mouseOver (dom) {
        dom.style.fontWeight = "bold"; 
    }
    
    mouseOut (dom) {
        dom.style.fontWeight = "normal";
    }
    
    mouseDown (dom) {
        dom.style.backgroundColor = "rgb(150, 150, 150)"; 
    }
    
    mouseUp (dom) {
        dom.style.backgroundColor = "rgb(150,150,150, 0.0)"; 
    }
    
    showDiv (divId) {
        document.getElementById(divId).style.display = "";
    }
    
    hideDiv (divId) {
        document.getElementById(divId).style.display = "none";
    }
    
    myGames (dom) {
        this.selectDiv(0);
    }
    
    newGame (dom) {
        this.selectDiv(1);
    }
    
    createGame (dom) {
        var isWhite = document.getElementById('CreateGameDetailsWhite').value == 1;
        var opponent = document.getElementById('CreateGameDetailsOtherUser').value;
        this.screen.communicator.createGame(isWhite, opponent, this.createGameFunc);
    }
    
    joinGame (gameId) {
        
        if (!(gameId in this.gameMap)) {
            //add div
            var div = document.createElement ('div');
            div.id = "loggedScreenPlay" + gameId;
            div.style.display = "none";
            div.style.padding = "0.1in";
            div.style.overflow = "hidden";
            document.getElementById('loggedScreenContent').appendChild(div);
            
            //add item to menu
            var table = document.getElementById('menu');
            var row = table.insertRow(-1);
            row.setAttribute("onclick", "screen.state.selectDiv(" + (table.rows.length - 1) + ")");
            row.setAttribute("onmouseover", "screen.event(this, 'onmouseover')");
            row.setAttribute("onmouseout", "screen.event(this, 'onmouseout')");
            var cell = row.insertCell(0);
            cell.innerHTML = "Game " + gameId;
            cell.style.border = "none";
            row.id = "loggedScreenEntry" + gameId;
            
            this.divList.push(new DivInfo (div.id, row.id));
            this.listImplemented.push(
                new Event (row.id, 'onmouseover', LoggedState.prototype.mouseOver.bind(this)));
            this.listImplemented.push(
                new Event (row.id, 'onmouseout', LoggedState.prototype.mouseOut.bind(this)));
            
            var isWhite = this.games.listGameInfo[gameId - 1].isWhite;
            var otherUser = this.games.listGameInfo[gameId - 1].otherUser;
            var gamebridge = new GameBridge (this.screen.communicator, gameId, isWhite, otherUser, div, this.width, this.height);
            
            this.gameMap[gameId] = new PlayingGameInfo(gameBridge, table.rows.length - 1);
        }
        
        this.selectDiv(this.gameMap[gameId].menuIndex);
    }
}
