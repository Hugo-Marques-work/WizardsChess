class RegMessage extends Message {
    constructor (user, pass) {
        super();
        this.user = user;
        this.pass = pass;
    }
    
    accept (visitor) {
        visitor.visitReg (this);
    }
}
