//
// Created by u-0xffset on 15.11.20.
//

#ifndef MATHENGINE_SIGN_HPP
#define MATHENGINE_SIGN_HPP

#include "./../Operator.hpp"
#include "../../Errors/Error.hpp"

#include <variant>

class Sign : public Operator {
public:
    Sign(int _pr, std::string _sr, int _ac);

    RETURN_TYPE_ERROR_LONGDOUBLE calc(long double params[]) override;
};

#endif //MATHENGINE_SIGN_HPP
