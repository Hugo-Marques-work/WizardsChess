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
    }
}

class LoginState extends ScreenState {
    constructor (screen) {
        super(screen);
        
        this.screen.communicator.setOnCreateAccountComplete (LoginState.prototype.createAccountComplete.bind(this));
        this.screen.communicator.setOnLoginComplete (LoginState.prototype.loginComplete.bind(this));
        
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
        
        this.screen.communicator.login(username, password);
    }
    
    doCreateAccount (dom) {
        var username = document.getElementById("loginScreenUsername").value;
        var password = document.getElementById("loginScreenPassword").value;
        
        this.showMessage("Waiting for server.");
        this.disableInput();
        
        this.screen.communicator.createAccount(username, password);
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

class LoggedState extends ScreenState {
    constructor (screen) {
        super(screen);
        
        this.divList = [
            new DivInfo ('loggedScreenListGames', 'loggedScreenEntry1'),
            new DivInfo ('loggedScreenNewGame', 'loggedScreenEntry2'),
            new DivInfo ('loggedScreenPlay', 'loggedScreenEntry3')
        ];
        
        this.currentDiv = 0;
        this.selectDiv(0);
        
        this.screen.communicator.setOnListGamesComplete (LoggedState.prototype.listGamesComplete.bind(this));
        this.screen.communicator.setOnCreateGameComplete (LoggedState.prototype.createGameComplete.bind(this));
        this.screen.communicator.listGames();
        
        this.gameBridge = null;
        this.currentGameId = -1;
        
        this.listImplemented = [
            new Event ('loggedScreenEntry1', 'onmouseover', LoggedState.prototype.mouseOver.bind(this)),
            new Event ('loggedScreenEntry2', 'onmouseover', LoggedState.prototype.mouseOver.bind(this)),
            new Event ('loggedScreenEntry3', 'onmouseover', LoggedState.prototype.mouseOver.bind(this)),
            new Event ('loggedScreenEntry1', 'onmouseout', LoggedState.prototype.mouseOut.bind(this)),
            new Event ('loggedScreenEntry2', 'onmouseout', LoggedState.prototype.mouseOut.bind(this)),
            new Event ('loggedScreenEntry3', 'onmouseout', LoggedState.prototype.mouseOut.bind(this)),
            new Event ('loggedScreenEntry1', 'onclick', LoggedState.prototype.myGames.bind(this)),
            new Event ('loggedScreenEntry2', 'onclick', LoggedState.prototype.newGame.bind(this)),
            new Event ('loggedScreenEntry3', 'onclick', LoggedState.prototype.play.bind(this)),
            new Event ('CreateGameButton', 'onclick', LoggedState.prototype.createGame.bind(this))
        ];
    }
    
    selectDiv (index) {
        var entry = document.getElementById(this.divList[this.currentDiv].entryId);
        entry.style.backgroundColor = "rgb(150,150,150, 0.0)";
        
        this.hideDiv(this.divList[this.currentDiv].divId);
        this.currentDiv = index;
        this.showDiv(this.divList[this.currentDiv].divId);
        
        entry = document.getElementById(this.divList[this.currentDiv].entryId);
        entry.style.backgroundColor = "rgb(150,150,150, 1.0)";
        
        //FIXME apenas tempiorario. usar Tab.onSelect
        if (index == 2)
        {
            if (this.gameBridge == null && this.currentGameId != -1) {
                document.getElementById('loggedScreenPlay').innerHTML = "";
                var dom = document.getElementById('loggedScreenPlay');
                var isWhite = this.games.listGameInfo[this.currentGameId - 1].isWhite;
                var otherUser = this.games.listGameInfo[this.currentGameId - 1].otherUser;
                this.gamebridge = new GameBridge (this.screen.communicator, this.currentGameId, isWhite, otherUser, dom);
                this.gamebridge.loop();
            }
        }
    }
    
    implemented () {
        return this.listImplemented;
    }
    
    divId () {
        return "loggedScreen";
    }
    
    createGameComplete (newGameId, gameInfo) {
        this.screen.communicator.listGames();
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
                cellTurnNumber.innerHTML = "";
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
    
    play (dom) {
        this.selectDiv(2);
        
        if (this.currentGameId == -1) {
            document.getElementById('loggedScreenPlay').innerHTML = "To play a game, go <b>My Games</b> e select one.";
        }   
    }
    
    createGame (dom) {
        var isWhite = document.getElementById('CreateGameDetailsWhite').value == 1;
        var opponent = document.getElementById('CreateGameDetailsOtherUser').value;
        this.screen.communicator.createGame(isWhite, opponent);
    }
    
    joinGame (gameId) {
        this.currentGameId = gameId;
    }
}
