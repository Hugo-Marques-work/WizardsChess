#include "Parser.h"
#include <stdexcept>
#include <cctype>
#include "../exceptions/ParserEofException.h"
#include "../exceptions/ParserOutOfRangeException.h"
#include "../exceptions/ParserConversionException.h"


Parser::Parser (const std::string& str) : _str(str), _index(0)
{
    
}
    
std::string Parser::readString ()
{
    int begin, length = _str.size();
    
    skipSpaces();
    
    if (_index == length)
        throw ParserEofException ();
    
    begin = _index;
    
    while (_index < length && _str[_index] != ' ')
        _index++; 
    
    return _str.substr (begin, _index - begin);
}

int Parser::readInteger ()
{
    std::string str = readString ();
    int result;
    
    for (char& c:str) 
        if (!std::isdigit(c))
            throw ParserConversionException();
        
    try 
    {       
        result = std::stoi(str);
    }
    catch (std::invalid_argument& e) 
    {
        throw ParserConversionException();
    }
    catch (std::out_of_range& e)
    {
        throw ParserOutOfRangeException();
    }
    
    return result;
}

void Parser::skipSpaces () 
{
    int length = _str.size();
    
    while (_index < length && _str[_index] == ' ')
        _index++; 
}
