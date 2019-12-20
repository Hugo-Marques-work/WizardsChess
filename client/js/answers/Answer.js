class Answer {

}

class RegAnswer extends Answer {
    constructor () {
        super();
    }
}

class LoginAnswer extends Answer {
    constructor () {
        super();
    }
}

class GameInfo {
    constructor (gameId, otherUser, isWhite) {
        this.gameId = gameId;
        this.otherUser = otherUser;
        this.isWhite = isWhite;
    }
}

class ListGamesAnswer extends Answer {
    constructor (listGameInfo) {
        super();
        this.listGameInfo = listGameInfo;
    }
}

class GameStatusAnswer extends Answer {
    constructor (status) {
        super();
        this.status;
    }
}

class MoveAnswer extends Answer {
    constructor (info) {
        super();
        this.info = info;
    }
}

class DropAnswer extends Answer {
    constructor () {
        super();
    }
}

class NewGameAnswer extends Answer {
    constructor () {
        super();
    }
}
