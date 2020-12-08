module.exports = {
    name: 'Im dad',
    enabled: true,
    execute(msg, client) {
        if (msg.channel.type === "dm") {
            return;
        }
        delete require.cache[require.resolve('../data/dadGuilds.json')];
        const { dadGuilds } = require("../data/dadGuilds.json");
        if (!dadGuilds.includes(msg.guild.id)) {
            return;
        }
        if (msg.author.bot) {
            return;
        }
        let str = msg.content;
        const options = ["I'm ", "i'm ", "Im ", "im ", "I am ", "i am ", "I’m ", "i’m ", "IM ", "I'M ", "I’M "];
        var option;
        var exit = false;
        for (var i = 0; i < options.length; i++) {
            if (!exit) {
                res = msg.content.search(options[i]);
                if (res != -1) {
                    exit = true;
                    option = options[i];
                }
            }
        }
        if (exit) {
            modified = str.substr(res + option.length, str.length);
            msg.channel.send("Hi " + modified + ", I'm Dad!");
        }
    },
};