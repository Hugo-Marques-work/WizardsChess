class LoginMessage extends Message {
    constructor (user, pass) {
        super();
        this.user = user;
        this.pass = pass;
    }
    
    accept (visitor) {
        visitor.visitLogin (this);
    }
    
    toString () {
        return "LOGIN_R " + this.user + " " + this.pass;
    }
}
