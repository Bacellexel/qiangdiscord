const isCommandDisabled = require('../util/check-command.js');
const request = require('request');

module.exports = {
  name: 'xkcd',
  execute(message) {

    if (isCommandDisabled(this.name)) return;
     let comicId = Math.floor(Math.random() * 2105);
    request('http://xkcd.com/'+ comicId +'/info.0.json', function(err, res, body) {
      if (!err && res.statusCode === 200) {
        message.channel.send(`${JSON.parse(body).img}`);
      } else {
        console.log(err);
      }
    });

  },
};
