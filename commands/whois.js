const Discord = require("discord.js");
const moment = require("moment");
const { color } = require('../data/config.json');
module.exports = {
        name: 'whois',
        description: 'Get information about a user',
        usage: '/whois [@user]',
        class: 'Useful',
        requiresArgs: false,
        execute(msg, args, client) {
            if (msg.channel.type == "dm") {
                return msg.channel.send("This is a guild-only command");
            }
            if (!args[0]) {
                user = msg.author;
            } else {
                user = msg.mentions.users.first();
            }
            if (!user) {
                return msg.channel.send("User not found");
            }
            const member = msg.guild.member(user);
            var roles = member.roles.cache.map(r => r).slice(0, -1).join("");
            if (!roles) {
                roles = "No roles";
            }
            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setThumbnail(user.displayAvatarURL({ size: 2048 }))
                .addField(`${user.tag}`, `${user}`, true)
                .addField("👑 Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
            .addField("❓ Status:", `${user.presence.status}`, true)
            .addField("📅 Joined The Server On:", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
            .addField("💥 Account Created On:", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true)
            .addField("📋 Roles:", roles, false)
            .addField("🆔 ID:", `${user.id}`, false)
        msg.channel.send(embed)
    },
};