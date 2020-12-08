//
// Created by u-0xffset on 12.11.20.
//

#ifndef MATHENGINE_CONSTANT_HPP
#define MATHENGINE_CONSTANT_HPP

#include <cmath>
#include <string>

class Constant {
public:
    long double value{};
    std::string stringRepresentation;

    Constant(long double _value, std::string _sr);
};

#endif //MATHENGINE_CONSTANT_HPP
