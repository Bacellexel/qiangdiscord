const selfReloadJSON = require('self-reload-json');
const data = new selfReloadJSON('disabled.json', 'utf8');
const isCommandDisabled = require('../util/check-command.js');
const {
  locale
} = require('../config.json');
const i18n = require('../i18n/i18n_' + locale + '.json');
const jsonHandler = require('../util/fsHandler.js');

module.exports = {
  name: 'cmd',
  execute(message, args) {

    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    if (!args.length || args.length < 2) return;

    const action = args[0];
    const name = args[1];

    let commands = data.commands;

    if (action == "enable") {
      //If we find the command name in the disabled.json file, we will remove it.
      for (let i = 0; i < commands.length; i++) {
        if (commands[i].name === name) {
          commands.splice(commands.indexOf(name), 1);
          jsonHandler.writeJSON('./disabled.json', data);
          message.reply(i18n.COMMAND_ENABLED + name);
        }
      }
    } else if (action == "disable") {
      for (let i = 0; i < commands.length; i++) {
        //If we find a match, it means the command is already disabled. So we exit.
        if (commands[i].name === name) return;
      }
      commands.push({
        name: name
      });
      jsonHandler.writeJSON('./disabled.json', data);
      message.reply(i18n.COMMAND_DISABLED + name);
    }
  },
};
