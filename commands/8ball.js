const isCommandDisabled = require('../util/check-command.js');
const {
  locale
} = require('../config.json');
const sayings = require('../assets/8ball_' + locale + '.json');
const i18n = require('../i18n/i18n_' + locale + '.json');

module.exports = {
  name: '8ball',
  execute(message, args) {

    if (isCommandDisabled(this.name)) return;
    if (!args.length) return message.channel.send(i18n.SPECIFY_QUESTION);

    var answer = Math.floor(Math.random() * sayings.length);
    message.channel.send(sayings[answer]);
  },
};
