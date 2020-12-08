//
// Created by u-0xffset on 10.11.20.
//

#ifndef MATHENGINE_OPERATOR_HPP
#define MATHENGINE_OPERATOR_HPP

#include <string>
#include <variant>

#include "../Errors/Error.hpp"


class Operator {
public:
    int precedence;
    std::string stringRepresentation;
    int argumentCount;
    bool leftAssociate = false;

    Operator(int _pr, std::string _sr, int _ac);

    virtual RETURN_TYPE_ERROR_LONGDOUBLE calc(long double params[]) = 0;
};

#endif //MATHENGINE_OPERATOR_HPP
