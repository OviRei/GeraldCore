//Dependencies
const { token, activity, version, botName, defaultPrefix, blacklist, owner } = require('./data/config.json');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const serviceFiles = fs.readdirSync('./services').filter(file => file.endsWith('.js'));
//Database Setup
var mongo = require('mongodb-wrapper');
var db = mongo.db('localhost', '27017', botName);
//Global Setup
var guilds = 0;
var statusItem = 0;
client.commands = new Discord.Collection();
client.services = new Discord.Collection();

//COMMAND INITIALISER
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log("Loaded command: " + command.name);
}

//service INITIALISER
for (const file of serviceFiles) {
    const service = require(`./services/${file}`);
    client.services.set(service.name, service);
    console.log("Loaded service: " + service.name);
}

//GETRANDOMINT
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

//STATUS BILLBOARD
function updateStatus() {
    guilds = 0;
    client.guilds.cache.forEach(guild => {
        guilds++;
    })

    var memberCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)

    today = new Date();
    var cmas = new Date(today.getFullYear(), 11, 25);
    if (today.getMonth() == 11 && today.getDate() > 25) {
        cmas.setFullYear(cmas.getFullYear() + 1);
    }
    var one_day = 1000 * 60 * 60 * 24;
    daysLeftMessage = Math.ceil((cmas.getTime() - today.getTime()) / (one_day)) +
        " days to Christmas!";

    switch (statusItem) {
        case 0:
            client.user.setActivity(activity);
            statusItem++;
            break;

        case 1:
            client.user.setActivity(guilds + " servers!", { type: 'WATCHING' });
            statusItem++;
            break;

        case 2:
            client.user.setActivity(memberCount + " members!", { type: 'WATCHING' });
            statusItem++;
            break;

        case 3:
            client.user.setActivity(daysLeftMessage, { type: 'WATCHING' });
            statusItem = 0;
            break;
    }
}

//Command Executor
function runCommand(commandName, message, args, client, prefix) {
    //Command exists? if not run NLP
    if (!client.commands.has(commandName)) {
        console.log('Running Command Assumptions');
        client.commands.get('whatsthatcommand').execute(message, args, client);
        return;
    }
    command = client.commands.get(commandName)
        //Check for NSFW
    if (command.class == "NSFW" && !message.channel.nsfw) {
        return message.channel.send("**This command is only available in NSFW channels!** 🔞");
    }
    //Check for Args
    if (command.requiresArgs && !args.length) {
        return message.channel.send("**This command requires arguments, but you didn't specify any!**\nCommand usage: `" + command.usage + "`");
    }
    //Execute command
    try {
        command.execute(message, args, client, prefix);
    } catch (error) {
        console.log(error);
        //Log execution errors
        client.users.cache.get(owner).send("Execution error in\n> `" + message.guild.name + "`\n> `" + message.channel.name + "`\n> Executed by user: `" + message.author.tag + "`\n> Command: " + commandName + "\n Error: " + error + "\n" + error.stack);
        if (message.channel.type == "dm") {
            errorMessage = "Failed whilst executing command: " + commandName + " Location: DM> " + message.author.tag
            console.log('\x1b[31m%s\x1b[0m', errorMessage);
        } else {
            errorMessage = "Failed whilst executing command: " + commandName + " Location: " + message.guild.name + "> " + message.channel.name + "> " + message.author.tag;
            console.log('\x1b[31m%s\x1b[0m', errorMessage);
        }
    }
    //Log command
    if (message.channel.type == "dm") {
        execMessage = "Executed command: " + commandName + " Location: DM> " + message.author.tag;
        console.log('\x1b[32m%s\x1b[0m', execMessage);
    } else {
        execMessage = "Executed command: " + commandName + " Location: " + message.guild.name + "> " + message.channel.name + "> " + message.author.tag;
        console.log('\x1b[32m%s\x1b[0m', execMessage);
    }
}

//Command Host Script
function commandHost(message, client) {
    content = message.content.replace("р", "p");
    content = content.replace("h", "h");
    //Command Decision Block
    if (blacklist.includes(message.author.id)) {
        return;
    }
    if (message.channel.type == "dm") {
        prefix = defaultPrefix;
        if (content.startsWith(prefix) && !message.author.bot) {
            args = content.slice(prefix.length).trim().split(/ |\n+/g);
            command = args.shift().toLowerCase()
            runCommand(command, message, args, client, prefix);
        }
    } else {
        db.collection('commands');
        db.commands.find({ ID: message.guild.id }).toArray(function(err, posts) {
            if (posts == null) {
                return;
            }
            if (!posts.length) {
                enabled = true;
                prefix = defaultPrefix;
                if (content.startsWith(prefix) && !message.author.bot) {
                    args = content.slice(prefix.length).trim().split(/ |\n+/g);
                    command = args.shift().toLowerCase()
                    runCommand(command, message, args, client, prefix);
                }
            } else {
                if (posts[0].PREFIX == null) {
                    prefix = defaultPrefix;
                } else {
                    prefix = posts[0].PREFIX;
                }
                whitelist = [];
                if (posts[0].WHITELIST == null) {
                    whitelist.push(message.channel.id);
                } else if (posts[0].WHITELIST[0] == "null") {
                    whitelist.push(message.channel.id);
                } else {
                    whitelist = posts[0].WHITELIST;
                }

                if (!whitelist.includes(message.channel.id)) {
                    return;
                }
                if (content.startsWith(prefix) && !message.author.bot) {

                    args = content.slice(prefix.length).trim().split(/ |\n+/g);
                    command = args.shift().toLowerCase()

                    if (posts[0].DISABLED == null) {
                        runCommand(command, message, args, client, prefix);
                    } else if (posts[0].DISABLED.includes(command)) {
                        message.channel.send("That command has been disabled ⛔");
                    } else {
                        runCommand(command, message, args, client, prefix);
                    }
                }
            }

        })
    }
};

//Service Executor
async function runService(message, client) {
    try {
        client.services.forEach(async(service) => {
            if (service.enabled) {
                await service.execute(message, client);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

//Service Host Script
function serviceHost(message, client) {
    if (blacklist.includes(message.author.id)) {
        return;
    }
    db.collection('commands');
    if (message.channel.type == "dm") {
        runService(message, client);
    } else {
        db.commands.find({ ID: message.guild.id }).toArray(function(err, posts) {
            if (posts == null) {
                return;
            }
            if (!posts.length) {
                runService(message, client);
            } else {
                whitelist = [];
                if (posts[0].WHITELIST == null) {
                    whitelist.push(message.channel.id);
                } else if (posts[0].WHITELIST[0] == "null") {
                    whitelist.push(message.channel.id);
                } else {
                    whitelist = posts[0].WHITELIST;
                }
                if (!whitelist.includes(message.channel.id)) {
                    return;
                }
                runService(message, client);
            }
        })
    }
};

console.log("Logging in...");

//READY STATE IDENTIFIER
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    setInterval(updateStatus, 10000);
    console.log("Succesfully loaded " + commandFiles.length + " commands");
    console.log("Succesfully loaded " + serviceFiles.length + " services");
    console.log("GeraldCore Version: V" + version);
});

//MESSAGE HANDLER
client.on('message', (message) => {
    //Ignore Webhooks
    if (message.webhookID) return;
    //Run commands and services
    commandHost(message, client);
    serviceHost(message, client);
    //Update XP
    db.collection('userstat');
    db.userstat.find({ ID: message.author.id }).toArray(function(err, posts) {
        if (!posts.length) {
            db.userstat.insert({ "ID": message.author.id, "XP": 0, "LEVEL": 1 })
        } else {
            xpinc = getRandomInt(10);
            element = posts[0];
            xp = element.XP;
            level = element.LEVEL;
            xp = xp + xpinc;
            if (xp > level * 30 ** 2) {
                level++;
            }
            db.userstat.update({ ID: message.author.id }, { $set: { XP: xp, LEVEL: level } });
        }
    })
});

//LOG IN TO DISCORD
client.login(token);