class Parser {
    constructor (string) {
        this.string = string;
        this.index = 0;
    }
    
    readString () {
        var begin, length = this.string.length;
        
        this.skipSpaces();
        
        if (this.index == length) 
            throw new ParserEofException ();
        
        begin = this.index;
        
        while (this.index < length && this.string[this.index] != ' ')
            this.index ++;
        
        return this.string.substr(begin, this.index - begin);
    }
    
    readInteger () {
        var number = Number (this.readString());
        
        if (isNaN(number) || !Number.isInteger(number))
            throw new ParserConversionException ();
        
        else
            return number;
    }
    
    skipSpaces () {
        var length = this.string.length;
        
        while (this.index < length && this.string[this.index] == ' ')
            this.index ++;
    }
}
