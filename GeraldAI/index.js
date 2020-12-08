//GeraldAI, based off of cleverbot-free (https://github.com/IntriguingTiles/cleverbot-free)
//Modified by ElementalMP4 for GeraldCore and other Discord Bots
//Because i'm super cool

const superagent = require("superagent");
const md5 = require("md5");
const fs = require("fs");

module.exports = async(id, stimulus, context = []) => {
    delete require.cache[require.resolve('./cookies.json')];
    var { cookies } = require("./cookies.json");
    const _context = context.slice();
    //Find the cookie object
    obj = cookies.find(x => x.id == id);
    //If no cookie, Get one ya dingus
    if (obj == null) {
        d = new Date();
        timeNow = d.getTime();
        const req = await superagent.get("https://www.cleverbot.com/");
        cookie = req.header["set-cookie"];
        age = 0;
        cookies.push({ "id": id, "XVIS": cookie, "lastUsed": timeNow });
        //write cookies
        var data = { "cookies": cookies };
        fs.writeFile("./cookies.json", JSON.stringify(data), (err) => {
            if (err) {
                console.error(err);
                return;
            };
        });
    } else {
        cookie = obj.XVIS;
        d = new Date();
        timeNow = d.getTime();
        age = timeNow - obj.lastUsed;
    }
    //If it's too old, regenerate it ya goobus
    if (age > 3600000) {
        d = new Date();
        timeNow = d.getTime();
        const req = await superagent.get("https://www.cleverbot.com/");
        cookie = req.header["set-cookie"];
        cookies.find(x => x.id == id).cookie = cookie;
        cookies.find(x => x.id == id).lastUsed = timeNow;
        //write cookies
        var data = { "cookies": cookies };
        fs.writeFile("./cookies.json", JSON.stringify(data), (err) => {
            if (err) {
                console.error(err);
                return;
            };
        });
    } else {
        d = new Date();
        timeNow = d.getTime();
        cookies.find(x => x.id == id).lastUsed = timeNow;
        var data = { "cookies": cookies };
        fs.writeFile("./cookies.json", JSON.stringify(data), (err) => {
            if (err) {
                console.error(err);
                return;
            };
        });
    }
    //Assemble the Payload
    let payload = `stimulus=${escape(stimulus).includes("%u") ? escape(escape(stimulus).replace(/%u/g, "|")) : escape(stimulus)}&`;
    const reverseContext = _context.reverse();
    for (let i = 0; i < _context.length; i++) {
        payload += `vText${i + 2}=${escape(reverseContext[i]).includes("%u") ? escape(escape(reverseContext[i]).replace(/%u/g, "|")) : escape(reverseContext[i])}&`;
    }
    payload += "cb_settings_scripting=no&islearning=1&icognoid=wsf&icognocheck=";
    payload += md5(payload.substring(7, 33));
    //Make the request
    const req = await superagent.post("https://www.cleverbot.com/webservicemin?uc=UseOfficialCleverbotAPI")
        .set("Cookie", cookie)
        .type("text/plain")
        .send(payload);
    //Return CleverBot output
    return decodeURIComponent(req.header["cboutput"]);
};