const isCommandDisabled = require('../util/check-command.js');
const {
  locale
} = require('../config.json');
const i18n = require('../i18n/i18n_' + locale + '.json');

module.exports = {
  name: 'prune',
  execute(message, args) {

    if (isCommandDisabled(this.name) || !message.member.hasPermission('MANAGE_MESSAGES')) return;
    if (!args.length) return message.channel.send(i18n.SPECIFY_MESSAGE_AMOUNT);

    if (args[0] < 99) {
      let count = Number(args[0]);
      message.channel.bulkDelete(count + 1);
    }
    return null;
  },
};
