const isCommandDisabled = require('../util/check-command.js');
const request = require('request');
const {locale} = require('../config.json');
const i18n = require('../i18n/i18n_' + locale + '.json');

module.exports = {
  name: 'anal',
  execute(message) {

    if (isCommandDisabled(this.name)) return;
    if (!message.channel.nsfw) return message.reply("🔞 " + i18n.SFW_CHANNEL_WARNING);

    request('https://nekobot.xyz/api/image?type=anal', function(err, res, body) {
      if (!err && res.statusCode === 200) {
        message.channel.send(`${JSON.parse(body).message}`);
      } else {
        console.log(err);
      }
    });

  },
};
