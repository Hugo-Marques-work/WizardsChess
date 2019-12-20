class ErrorAnswerException extends Error {
    constructor (errId) {
        super();
        this.errId = errId;
    }
}
