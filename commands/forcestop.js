const { admins } = require("../data/config.json");
module.exports = {
    name: 'forcestop',
    description: 'Stops the core module. Admin only',
    usage: '/forcestop',
    class: 'Admin',
    requiresArgs: false,
    execute(msg, args, client) {
        if (admins.includes(msg.author.id)) {
            client.destroy();
        } else {
            msg.channel.send("You are not an admin.");
        }
    },
};