//
// Created by u-0xffset on 12.11.20.
//

#ifndef MATHENGINE_SINE_HPP
#define MATHENGINE_SINE_HPP

#include "./../Operator.hpp"
#include "../../Errors/Error.hpp"

#include <variant>

class Sine : public Operator {
public:
    Sine(int _pr, std::string _sr, int _ac);

    RETURN_TYPE_ERROR_LONGDOUBLE calc(long double params[]) override;
};

#endif //MATHENGINE_SINE_HPP
