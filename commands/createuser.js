const isCommandDisabled = require('../util/check-command.js');
const {
  locale
} = require('../config.json');
const i18n = require('../i18n/i18n_' + locale + '.json');
const user = require('../util/user_handler.js');


module.exports = {
  name: 'register',
  execute(message) {

    if (isCommandDisabled(this.name)) return;
    if (user.verify(message.author.username)) {
      message.reply(i18n.ACCOUNT_ALREADY_EXIST);
    } else {
      user.create(message.author.username);
      message.react('✅');
    }
  },
};
