//
// Created by u-0xffset on 13.11.20.
//

#ifndef MATHENGINE_RPNTOBINARYTREE_HPP
#define MATHENGINE_RPNTOBINARYTREE_HPP

#include "./../../TreeNodes/TreeNode.hpp"
#include "../../Constants/Constant.hpp"
#include "../../Operators/Operator.hpp"
#include "../../Errors/Error.hpp"

#include <string>
#include <map>
#include <variant>

namespace rpnToBinaryTree {
    RETURN_TYPE_ERROR_TREE parseBinaryTree(const std::string &rpn_string,
                             const std::map<char, Constant> &constantTable,
                             const std::map<char, Operator *> &operatorTable);

    int numberOfOccurrences(std::string &str, char match);
}

#endif //MATHENGINE_RPNTOBINARYTREE_HPP
