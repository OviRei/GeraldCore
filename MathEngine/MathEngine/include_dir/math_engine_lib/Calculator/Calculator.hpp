//
// Created by u-0xffset on 19.11.20.
//

#ifndef MATHENGINESHAREDLIBRARY_CALCULATOR_HPP
#define MATHENGINESHAREDLIBRARY_CALCULATOR_HPP

#include <string>
#include <map>
#include <chrono>
#include <variant>

#include "../HeaderOfConvenience.hpp"
#include "../Constants/Constant.hpp"
#include "../Operators/IncludeOperators.hpp"
#include "../TreeNodes/TreeNode.hpp"
#include "../Errors/Error.hpp"
#include "../Errors/Error.hpp"

namespace MathEngine {
    class Calculator {
    private: // TODO make this private again
        std::map<std::string, char> operatorParseTable;
        std::map<std::string, char> constantParseTable;
        std::map<char, Constant> constantTable; // because im lazy
        std::map<char, Operator *> operatorTable;

        std::string rpn_out; // RPN string of input
        std::string rpn_string;

        std::chrono::microseconds infixToRPNTime{};
        std::chrono::microseconds RPNtoBinaryTreeTime{};
        std::chrono::microseconds calculationTime{};

        std::chrono::high_resolution_clock::time_point start;
        std::chrono::high_resolution_clock::time_point stop;

        int funcCount;
        int constCount;

        long double result;

    public:
        Calculator();

        void setup();

        RETURN_TYPE_ERROR_LONGDOUBLE calculate(const TreeNode &tree);

        RETURN_TYPE_ERROR initCalculation(const std::string &_input);

        [[nodiscard]] std::chrono::microseconds getInfixToRPNTime() const;

        [[nodiscard]] std::chrono::microseconds getRPNtoBinaryTreeTime() const;

        [[nodiscard]] std::chrono::microseconds getCalculationTime() const;

        [[nodiscard]] std::string getRPNOut() const;

        [[nodiscard]] std::string getRPNString() const;

        [[nodiscard]] long double getResult() const;
    };
}

#endif //MATHENGINESHAREDLIBRARY_CALCULATOR_HPP
