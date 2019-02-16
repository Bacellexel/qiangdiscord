const isCommandDisabled = require('../util/check-command.js');
const {
  locale
} = require('../config.json');
const i18n = require('../i18n/i18n_' + locale + '.json');
const user = require('../util/user_handler.js');


module.exports = {
  name: 'user',
  execute(message, args) {

    if (isCommandDisabled(this.name)) return;
    if(!args.length) return;

    if (!user.verify(args[0])) {
      return;
    } else {
      let target = user.get(args[0]);
      message.channel.send(`${target.username} (Lv. ${target.level}) : $${target.currency}.`);
    }
  },
};
