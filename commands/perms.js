module.exports = {
    name: 'perms',
    description: 'Gets your member permissions',
    usage: '/perms',
    class: 'Useful',
    requiresArgs: false,
    utterances: ["memberperms", "channelperms", "permisisons", "member permissions", "permissions", "permission", "what are my perms"],
    execute(msg, args, client) {
        var perms = msg.member.permissionsIn(msg.channel).toArray();
        perms = "```" + perms.join("\n") + "```";
        msg.channel.send(perms);
    },
};