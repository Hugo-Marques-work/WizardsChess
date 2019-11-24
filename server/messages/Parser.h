#ifndef PARSER_H
#define PARSER_H

#include <string>

class Parser 
{
private:
    std::string _str;
    int _index;
    
    void skipSpaces ();
public:
    Parser (const std::string& str);
    
    std::string readString ();
    int readInteger ();
};

#endif
