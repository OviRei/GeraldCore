//
// Created by u-0xffset on 12.11.20.
//

#ifndef MATHENGINE_MULTIPLICATION_HPP
#define MATHENGINE_MULTIPLICATION_HPP

#include "./../Operator.hpp"
#include "../../Errors/Error.hpp"

#include <variant>

class Multiplication : public Operator {
public:
    Multiplication(int _pr, std::string _sr, int _ac);

    RETURN_TYPE_ERROR_LONGDOUBLE calc(long double params[]) override;
};

#endif //MATHENGINE_MULTIPLICATION_HPP
