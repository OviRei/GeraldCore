const cleverbot = require("cleverbot-free");
const { defaultPrefix, blacklist } = require("../data/config.json");
const contextFactor = 10;
module.exports = {
    name: 'GeraldAI Conversation Service',
    enabled: true,
    execute(msg, client) {
        prefix = defaultPrefix;
        //clear cache
        delete require.cache[require.resolve('../data/aichannels.json')];
        const { channels } = require("../data/aichannels.json");
        //blacklist detector
        if (!blacklist.includes(msg.author.id)) {
            //fetch context
            msg.channel.messages.fetch({ limit: contextFactor }).then(data => {
                context = data.map(item => { return item.content });
                //chat command reply
                if (channels.includes(msg.channel.id) && !msg.content.startsWith(prefix) && msg.author.tag !== client.user.tag && !msg.content.startsWith("GeraldAI")) {
                    msg.channel.startTyping();
                    cleverbot(msg.content, context).then(response => msg.channel.send(response));
                    msg.channel.stopTyping();
                    //dm reply
                } else if (msg.channel.type === "dm" && msg.author.tag !== client.user.tag && !msg.content.startsWith(prefix)) {
                    msg.channel.startTyping();
                    cleverbot(msg.content, context).then(response => msg.channel.send(response));
                    msg.channel.stopTyping();
                    //ping reply
                } else if (msg.mentions.users.first() !== undefined) {
                    if (msg.mentions.users.first().id == client.user.id) {
                        msg.channel.startTyping();
                        cleverbot(msg.content, context).then(response => msg.channel.send(response));
                        msg.channel.stopTyping();
                    }
                }
            })
        }
    },
};
