module.exports = {
    name: 'big',
    description: 'Converts a message to emoji text',
    usage: '/big [string]',
    class: 'Random',
    requiresArgs: true,
    execute(msg, args) {
        var str = args[0];
        for (i = 1; i < args.length; i++) {
            var arg = args[i];
            var str = str + " " + arg;
        }
        arg = str.toLowerCase();
        str = arg;
        var chars = str.split("");
        str = "";
        for (i = 0; i < chars.length; i++) {
            if (chars[i] === " ") {
                str = str + "  ";
            } else {
                str = str + ":regional_indicator_" + chars[i] + ":";
            }
        }
        msg.channel.send(str);
        msg.delete();

    },
};