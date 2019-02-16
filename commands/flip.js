const isCommandDisabled = require('../util/check-command.js');
const {
  locale
} = require('../config.json');
const i18n = require('../i18n/i18n_' + locale + '.json');

module.exports = {
  name: 'flip',
  execute(message) {

    if (isCommandDisabled(this.name)) return;

    var answer = Math.floor(Math.random() * 2);
    if (answer === 0) return message.reply(i18n.HEADS);
    if (answer === 1) return message.reply(i18n.TAILS);
  },
};
