//
// Created by u-0xffset on 13.11.20.
//

#ifndef MATHENGINE_INPUTPARSER_HPP
#define MATHENGINE_INPUTPARSER_HPP

#include <string>
#include <variant>

#include "../../HeaderOfConvenience.hpp"
#include "../../Errors/Error.hpp"

namespace inputParser {
    RETURN_TYPE_ERROR parseInput(std::string &in, const char *argv);
    int numberOfOccurrences(std::string &str, char match);
}

#endif //MATHENGINE_INPUTPARSER_HPP
