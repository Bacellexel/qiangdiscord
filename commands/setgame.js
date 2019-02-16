const isCommandDisabled = require('../util/check-command.js');
const {
  locale
} = require('../config.json');
const i18n = require('../i18n/i18n_' + locale + '.json');


module.exports = {
  name: 'activity',
  execute(message, args) {

    if (isCommandDisabled(this.name) || !message.member.hasPermission('ADMINISTRATOR')) return;
    if (!args.length) return message.channel.send(i18n.SPECIFY_ACTIVITY);

    message.client.user.setActivity(args[0], {
      type: args[1]
    });
  },
};
