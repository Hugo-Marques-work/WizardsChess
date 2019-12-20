class WrongInputException extends Error {
    constructor (str) {
        super("Wrong Input Exception: " + str);
    }
}
