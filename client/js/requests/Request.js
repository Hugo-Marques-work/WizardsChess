function requestReg (name, pass) {
    return "REG_R " + name + " " + pass;
}

function requestLogin (name, pass) {
    return "LOGIN_R " + name + " " + pass;
}

function requestListGames () {
    return "LIST_GAMES_R";
}

function requestGameStatus (gameId) {
    return "GAME_STATUS_R " + gameId;
}

function requestGameTurn (gameId) {
    return "GAME_TURN_R " + gameId;
}

function requestGameLastMove (gameId) {
    return "GAME_LAST_MOVE_R " + gameId;
}

function requestGameMove (gameId, x1, y1, x2, y2) {
    return "GAME_MOVE_R " /*+ gameId + " " */
                + x1 + " " + y1 + " " + x2 + " " + y2;
}

function requestDrop (gameId) {
    return "GAME_DROP_R " + gameId;
}

function requestPawnPromotion (gameId, type) {
    return "PAWN_PROMOTION_R " + gameId + " " + type;
}

function requestNewGame (other, iAmWhite) {
    var color;
    
    if (iAmWhite)
        color = "W";
    else
        color = "B";
    
    return "NEW_GAME_R " + other + " " + color;
}

function requestImportGame(gameId) {
    return "IMPORT_GAME_R " + gameId;
}
