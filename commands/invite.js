module.exports = {
    name: 'invite',
    description: 'Get the invite link for this bot',
    usage: '/invite',
    class: 'Useful',
    requiresArgs: false,
    execute(msg, args, client) {
        msg.channel.send("Here it is! \nhttps://discord.com/api/oauth2/authorize?client_id=555816892141404163&permissions=741702720&scope=bot")
    },
};