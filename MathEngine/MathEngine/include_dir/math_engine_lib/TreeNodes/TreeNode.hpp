//
// Created by u-0xffset on 12.11.20.
//

#ifndef MATHENGINE_TREENODE_HPP
#define MATHENGINE_TREENODE_HPP

#include <any>
#include <vector>

namespace TreeNodeType {
    enum class Type {
        Operator,
        Constant,
        Number
    };
}

namespace MathEngine {
    class TreeNode {
    public:
        TreeNodeType::Type type;
        long double value;
        std::vector<TreeNode> nodes;

        TreeNode(TreeNodeType::Type _type, long double _value);

        TreeNode(TreeNodeType::Type _type, long double _value, std::vector<TreeNode> _nodes);
    };
}

#endif //MATHENGINE_TREENODE_HPP
