//
// Created by u-0xffset on 12.11.20.
//

#ifndef MATHENGINE_TANGENT_HPP
#define MATHENGINE_TANGENT_HPP

#include "../Operator.hpp"
#include "../../Errors/Error.hpp"

#include <variant>

class Tangent : public Operator {
public:
    Tangent(int _pr, std::string _sr, int _ac);

    RETURN_TYPE_ERROR_LONGDOUBLE calc(long double params[]) override;
};

#endif //MATHENGINE_TANGENT_HPP
