module.exports = {
    name: 'choose',
    description: 'Gerald will help you choose between several options',
    usage: '/choose [-option1 -option2 -option3...] NOTE: options must be prefaced by a "-"',
    class: 'Decisions',
    requiresArgs: true,
    utterances: ["which one of these", "i cant choose", "im not sure", "choose", "choices", "decide"],
    execute(msg, args, client) {
        var counts = {};
        str = args.join("");
        chars = str.split("");
        for (var i = 0; i < chars.length; i++) {
            var char = chars[i];
            counts[char] = counts[char] ? counts[char] + 1 : 1;
        }
        console.log(counts);
        argCount = counts["-"];
        console.log(argCount);
        if (argCount < 1) {
            msg.channel.send("You must supply some choices / seperate them with a '-'");
        } else {
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max) + 1);
            };
            optionNumber = getRandomInt(argCount);
            console.log(optionNumber);
            msg.channel.send("Go with option " + optionNumber);
        }

    },
};