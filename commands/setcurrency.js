const isCommandDisabled = require('../util/check-command.js');
const user = require('../util/user_handler.js');


module.exports = {
  name: 'addcoin',
  execute(message, args) {

    if (isCommandDisabled(this.name)) return;
    if (!message.member.hasPermission('ADMINISTRATOR')) return;

    if (user.verify(args[0])) {
      user.setCurrency(args[0], args[1]);
    }
  },
};
