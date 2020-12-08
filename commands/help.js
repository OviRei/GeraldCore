const { defaultPrefix, version, botName, color, admins } = require('../data/config.json');
const Discord = require("discord.js");
module.exports = {
    name: 'help',
    description: 'List all commands or get info about a specific command.',
    usage: '/help [command] or /help',
    class: 'Useful',
    requiresArgs: false,
    utterances: ["how do i use this", "commands", "command list", "show me commands", "how to"],
    execute(msg, args, client) {
        const git = "https://github.com/Elementalmp4/GeraldCore";
        var prefix = defaultPrefix;
        var helpEmbed;
        const iconURL = client.user.avatarURL();
        const { commands, services } = msg.client;
        var commandTotal = commands.map(command => command.name);
        var serviceTotal = services.map(command => command.name);
        //CLASSIFY COMMANDS
        var useful = commands.map(command => { if (command.class === "Useful") { return '`' + command.name + '`' } else { return "" } });
        useful = useful.filter(function(el) {
            return el != "";
        });
        var admin = commands.map(command => { if (command.class === "Admin") { return '`' + command.name + '`' } else { return "" } });
        admin = admin.filter(function(el) {
            return el != "";
        });
        var random = commands.map(command => { if (command.class === "Random") { return '`' + command.name + '`' } else { return "" } });
        random = random.filter(function(el) {
            return el != "";
        });
        var entertaining = commands.map(command => { if (command.class === "Entertaining") { return '`' + command.name + '`' } else { return "" } });
        entertaining = entertaining.filter(function(el) {
            return el != "";
        });
        var configuration = commands.map(command => { if (command.class === "Configuration") { return '`' + command.name + '`' } else { return "" } });
        configuration = configuration.filter(function(el) {
            return el != "";
        });
        var wholesome = commands.map(command => { if (command.class === "Wholesome") { return '`' + command.name + '`' } else { return "" } });
        wholesome = wholesome.filter(function(el) {
            return el != "";
        });
        var nsfw = commands.map(command => { if (command.class === "NSFW") { return '`' + command.name + '`' } else { return "" } });
        nsfw = nsfw.filter(function(el) {
            return el != "";
        });
        var decisions = commands.map(command => { if (command.class === "Decisions") { return '`' + command.name + '`' } else { return "" } });
        decisions = decisions.filter(function(el) {
            return el != "";
        });
        var Currency = commands.map(command => { if (command.class === "Currency") { return '`' + command.name + '`' } else { return "" } });
        Currency = Currency.filter(function(el) {
            return el != "";
        });

        //EMBED SWITCH
        if (!args.length) {
            helpEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setURL(git)
                .setThumbnail(iconURL)
                .setTitle(botName + ' Help')
                .addField(' Useful ✅', "`" + prefix + 'help useful`', true)
                .addField(' Random 🎰', "`" + prefix + 'help random`', true)
                .addField(' Entertaining 🕹', "`" + prefix + 'help entertaining`', true)
                .addField(' NSFW 🔞', "`" + prefix + 'help nsfw`', true)
                .addField(' Wholesome ❤', "`" + prefix + 'help wholesome`', true)
                .addField(' Decisions 🤔', "`" + prefix + 'help decisions`', true)
                .addField(' Currency 💵', "`" + prefix + 'help Currency`', true)
                .addField(' Configuration ⚙', "`" + prefix + 'help configuration`', true)
                .addField(' Further Help 📜', "`" + prefix + 'help [command] `', true)
                .setFooter(botName + ' - V' + version + "\nCurrent services installed: " + serviceTotal.length + "\nCurrent Commands loaded: " + commandTotal.length, iconURL)
            msg.author.send(helpEmbed);
            if (msg.channel.type !== "dm") {
                msg.channel.send("You've got mail! 📫");
            }
            return;
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name);

        if (!command) {
            switch (name) {
                case "useful":
                    helpEmbed = new Discord.MessageEmbed()
                        .setColor(color)
                        .setURL(git)
                        .setThumbnail(iconURL)
                        .setTitle(botName + ' Help')
                        .addField(' Useful ✅', useful, true)
                        .setFooter(botName + ' - V' + version + "\nCurrent services installed: " + serviceTotal.length + "\nCurrent Commands loaded: " + commandTotal.length, iconURL)
                    msg.author.send(helpEmbed);
                    if (msg.channel.type !== "dm") {
                        msg.channel.send("You've got mail! 📫");
                    }
                    break;

                case "random":
                    helpEmbed = new Discord.MessageEmbed()
                        .setColor(color)
                        .setURL(git)
                        .setThumbnail(iconURL)
                        .setTitle(botName + ' Help')
                        .addField(' Random 🎰', random, true)
                        .setFooter(botName + ' - V' + version + "\nCurrent services installed: " + serviceTotal.length + "\nCurrent Commands loaded: " + commandTotal.length, iconURL)
                    msg.author.send(helpEmbed);
                    if (msg.channel.type !== "dm") {
                        msg.channel.send("You've got mail! 📫");
                    }
                    break;

                case "entertaining":
                    helpEmbed = new Discord.MessageEmbed()
                        .setColor(color)
                        .setURL(git)
                        .setThumbnail(iconURL)
                        .setTitle(botName + ' Help')
                        .addField(' Entertaining 🕹', entertaining, true)
                        .setFooter(botName + ' - V' + version + "\nCurrent services installed: " + serviceTotal.length + "\nCurrent Commands loaded: " + commandTotal.length, iconURL)
                    msg.author.send(helpEmbed);
                    if (msg.channel.type !== "dm") {
                        msg.channel.send("You've got mail! 📫");
                    }
                    break;

                case "configuration":
                    helpEmbed = new Discord.MessageEmbed()
                        .setColor(color)
                        .setURL(git)
                        .setThumbnail(iconURL)
                        .setTitle(botName + ' Help')
                        .addField(' Configuration ⚙', configuration, true)
                        .setFooter(botName + ' - V' + version + "\nCurrent services installed: " + serviceTotal.length + "\nCurrent Commands loaded: " + commandTotal.length, iconURL)
                    msg.author.send(helpEmbed);
                    if (msg.channel.type !== "dm") {
                        msg.channel.send("You've got mail! 📫");
                    }
                    break;

                case "wholesome":
                    helpEmbed = new Discord.MessageEmbed()
                        .setColor(color)
                        .setURL(git)
                        .setThumbnail(iconURL)
                        .setTitle(botName + ' Help')
                        .addField(' Wholesome ❤', wholesome, true)
                        .setFooter(botName + ' - V' + version + "\nCurrent services installed: " + serviceTotal.length + "\nCurrent Commands loaded: " + commandTotal.length, iconURL)
                    msg.author.send(helpEmbed);
                    if (msg.channel.type !== "dm") {
                        msg.channel.send("You've got mail! 📫");
                    }
                    break;

                case "nsfw":
                    helpEmbed = new Discord.MessageEmbed()
                        .setColor(color)
                        .setURL(git)
                        .setThumbnail(iconURL)
                        .setTitle(botName + ' Help')
                        .addField(' NSFW 🔞', nsfw, true)
                        .setFooter(botName + ' - V' + version + "\nCurrent services installed: " + serviceTotal.length + "\nCurrent Commands loaded: " + commandTotal.length, iconURL)
                    msg.author.send(helpEmbed);
                    if (msg.channel.type !== "dm") {
                        msg.channel.send("You've got mail! 📫");
                    }
                    break;

                case "decisions":
                    helpEmbed = new Discord.MessageEmbed()
                        .setColor(color)
                        .setURL(git)
                        .setThumbnail(iconURL)
                        .setTitle(botName + ' Help')
                        .addField(' Decisions 🤔', decisions, true)
                        .setFooter(botName + ' - V' + version + "\nCurrent services installed: " + serviceTotal.length + "\nCurrent Commands loaded: " + commandTotal.length, iconURL)
                    msg.author.send(helpEmbed);
                    if (msg.channel.type !== "dm") {
                        msg.channel.send("You've got mail! 📫");
                    }
                    break;

                case "currency":
                    helpEmbed = new Discord.MessageEmbed()
                        .setColor(color)
                        .setURL(git)
                        .setThumbnail(iconURL)
                        .setTitle(botName + ' Help')
                        .addField(' Currency 💵', Currency, true)
                        .setFooter(botName + ' - V' + version + "\nCurrent services installed: " + serviceTotal.length + "\nCurrent Commands loaded: " + commandTotal.length, iconURL)
                    msg.author.send(helpEmbed);
                    if (msg.channel.type !== "dm") {
                        msg.channel.send("You've got mail! 📫");
                    }
                    break;

                case "admin":
                    if (!admins.includes(msg.author.id)) {
                        return;
                    }
                    helpEmbed = new Discord.MessageEmbed()
                        .setColor(color)
                        .setURL(git)
                        .setThumbnail(iconURL)
                        .setTitle(botName + ' Help')
                        .addField(' Admin 🔐', admin, true)
                        .setFooter(botName + ' - V' + version + "\nCurrent services installed: " + serviceTotal.length + "\nCurrent Commands loaded: " + commandTotal.length, iconURL)
                    msg.author.send(helpEmbed);
                    if (msg.channel.type !== "dm") {
                        msg.channel.send("You've got mail! 📫");
                    }
                    break;

                default:
                    msg.channel.send("Command/Class not found");
            }
        } else {
            helpEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setURL(git)
                .setThumbnail(iconURL)
                .setTitle(botName + ' Help')
                .addField('Command', "`" + command.name + "`", true)
                .addField('Description', "```" + command.description + "```", true)
                .addField('Usage', "```" + command.usage + "```", false)
                .addField('Class: ', "`" + command.class + "`", true)
                .setFooter(botName + ' - V' + version, iconURL)
            msg.channel.send(helpEmbed);
        }
    },
};