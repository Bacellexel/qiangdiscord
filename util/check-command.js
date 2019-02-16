const selfReloadJSON = require('self-reload-json');
const config = new selfReloadJSON('disabled.json', 'utf8')

/**
 * @param {string} commandName Name of the command to check
 */

module.exports = function(commandName) {

  let commands = config.commands;

  for (let i = 0; i < commands.length; i++) {
    if (commands[i] != undefined) {
      if (commands[i].name === commandName) {
        return true;
      }
    }
  }
};
