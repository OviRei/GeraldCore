//
// Created by u-0xffset on 13.11.20.
//

#ifndef MATHENGINE_HEADEROFCONVENIENCE_HPP
#define MATHENGINE_HEADEROFCONVENIENCE_HPP

#define FUNCTION_START_RANGE 0x1
#define CONSTANT_START_RANGE 0x1E

#define funcCode(x) (FUNCTION_START_RANGE + x)
#define constCode(x) (CONSTANT_START_RANGE + x)

#define ADD_FUNC(name, code, _Operator) \
this->operatorParseTable.insert(std::pair<std::string, char>(name, funcCode(code))); \
this->operatorTable.insert(std::pair<char, Operator*>(funcCode(code), _Operator));   \
code++;

#define ADD_CONST(name, code, value) \
this->constantParseTable.insert(std::pair<std::string, char>(name, constCode(code))); \
this->constantTable.insert(std::pair<char, Constant>(constCode(code), Constant(value, std::string("[") + std::string(name) + std::string("]")))); \
code++;

#define ADD_OP(name, _Operator) this->operatorTable.insert(std::pair<char, Operator*>(name, _Operator));

bool isNumeric(char c);

bool isFunction(char c, int amount);

bool isConstant(char c, int amount);

#endif //MATHENGINE_HEADEROFCONVENIENCE_HPP
