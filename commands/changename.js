const fs = require("fs");
module.exports = {
    name: 'changename',
    description: 'Changes your nickname',
    usage: '/changename [name]',
    class: 'Useful',
    requiresArgs: true,
    utterances: ["change my name", "change my nickname", "name", "nickname"],
    execute(msg, args) {
        try {
            var str = args.join(" ");
            msg.member.setNickname(str);
        } catch (error) {}
    },
};