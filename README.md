# GeraldCore
"For some reason this exists"
    -ElementalMP4 


# Installing and launching GeraldCore

**Installation**
You will need to install the dependencies with
`npm install package.json`
Additionally, you will need to install MongoDB server.

`sudo apt update`
`sudo apt upgrade -y`
`sudo apt install mongodb`
And then enable with
`sudo systemctl enable mongodb`
`sudo systemctl start mongodb`

On windows:
Visit https://www.mongodb.com/try/download/community?tck=docs_server
Download and install the latest MongoDB MSI.

If you are using `NOT` using linux, ignore these steps and remove `mathengine.js` from `/commands`

Head over to https://github.com/0xffset/MathEngineSharedLibrary

If you are using a raspberry pi, download this file: https://github.com/0xffset/MathEngineSharedLibrary/tree/master/cmake-build-release-armhf

If you are using a Linux PC, download this file: https://github.com/0xffset/MathEngineSharedLibrary/tree/master/cmake-build-release

Then, put the file in `/usr/lib` You may need root permission to do this.

**Setup**
This bit is easy enough, just fill out the `config.json` file
```js
{
    "defaultPrefix": "/", //The command prefix
    "token": "token-goes-here", //Your bot prefix
    "activity": "/help", //The default activity, we recommend setting it to the help command
    "owner": "", //Allows GC9 to send you error messages
    "admins": [], //Allows certain users to use commands such as services
    "ignoredChannels": [], //Channels to ignore
    "blacklist": [], //User blacklist
    "logPort" :"3000", //The port to use for USocket
    "color": "#af2f33", //Bot embed colour
    "botName": "Gerald", //Bot name, used for MongoDB
    "version": "9.1.0" //version
}
```
**Deployment**
Deployment is pretty easy, just run `npm start` in the bot folder and pm2 will handle the rest.
Some useful commands: 

- npm run start (to start the bot)
- pm2 ps (to show pm2 processes)
