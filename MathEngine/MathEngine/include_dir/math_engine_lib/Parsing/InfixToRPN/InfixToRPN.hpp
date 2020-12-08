//
// Created by u-0xffset on 13.11.20.
//

#ifndef MATHENGINE_INFIXTORPN_HPP
#define MATHENGINE_INFIXTORPN_HPP

#include "../../Constants/Constant.hpp"
#include "../../Operators/Operator.hpp"
#include "../../Errors/Error.hpp"

#include <map>
#include <string>
#include <variant>

namespace infixToRPN {
    void spacing(std::string &rpn_out, std::string &rpn_string);

    RETURN_TYPE_ERROR convertInput(std::string &in, std::string &rpn_out, std::string &rpn_string,
                      const std::map<char, Constant> &constantTable,
                      const std::map<char, Operator *> &operatorTable,
                      const std::map<std::string, char> &constantParseTable,
                      const std::map<std::string, char> &operatorParseTable);
}

#endif //MATHENGINE_INFIXTORPN_HPP
