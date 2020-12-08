module.exports = {
    name: 'zalgo',
    description: 'Converts text to zalgo',
    usage: '/zalgo [text]',
    class: 'Entertaining',
    requiresArgs: true,
    execute(msg, args, client) {
        //ZALGO ARENA

        var zalgo = ["a̸̱̦̪̫̯̹̫ͧ̍̆", "̦̱͉̭́̇̍̿̊b̵̻", "͇̤̬̯̯̬̳ͬ͌͑̕c̳", "̿̃͌d̰̰͎̥͈̦̗̊", "̩͉̬̅ͨe", "̴͈̱̲͆̉ͅͅf̥͈͍̯̦͍ͦͪ̂̚ͅ", "̜̞ͥ̈́ͩ͒̇ͤ̈́g̢̳͆̌̆ͮ", "̝̰̙̱͚̰ͬ̒̃́ͬͬhͨ̾͞", "͔̙̝̬̖̗̦͛̈́ͬ̃̏̈́̆í̝̉̍͞", "͗ͤͮ̌͏̳͔̦̫͔̱͔j̟͚͍ͅͅ", "̠̱̱̪̮͌̇ͪ̏k̘̭̱̍ͣ̓ͪ̐̍͆͜", "̙l͖ͬͥ̉ͣ͢", "̩̟̗̠̱̟̯͑͛ͣͮ͑ṃ̢͍̾̓̉̚", "̗͙͎̀̈ͣ͛̚n̪̬̗͍͈̱͔ͬ̓͆̀̂ͮ", "͔̜́o̶̭̭͎̍̎͋̍̓̊", "̸͎͕̜̻̞͚͉͑̿p͌ͤ͊̅҉̳͈̬̤", "͎͎͍̟̩̰͒̒͟q̯̆͋̉̿̕", "̛̼̳̯͈ŗ̰̹͖̝̗͕ͮ̀͑ͤ͒̊", "͉͓̙̲̮ͯ̿ͩ̈́̅͊̂s̟̼̗̊̈ͪ̓͐̎̾", "̹̹ͤ̎ͨ͋ͅt̲͖͋ͦͭ̔", "͊̏ͩ͛̒̂͛͠u̦", "̸͍̘̖̞͔̳̽̓ͣͯ͆v̑̊ͯ̑͛", "̫̞͍͈͖ͨͅͅw͙̱̪͇͙̬ͭ͒̽͊̍́ͅ", "͔̼̟̜̫͚͈͌͊̄̕x͇̺̫͉͇̱̩ͧ͆̾͝", "̲̳͙͇͉̝̇y̤̞̜̍̑̾̉̾̾ͮ͠", "̗ͤ̊ͧ͗͆͝z̜̆͛̏̓̆̑̊"];

        //END ZALGO ARENA
        var english = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        if (!args[0]) {
            return msg.channel.send("You must supply some text");
        }
        var message = "";
        str = args.join(" ").toLowerCase();
        str = str.split("");
        for (i = 0; i < str.length; i++) {
            if (english.includes(str[i])) {
                message = message + zalgo[english.indexOf(str[i])];
            } else {
                message = message + str[i];
            }
        }
        msg.channel.send(message);
    },
};