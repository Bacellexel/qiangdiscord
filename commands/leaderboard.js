const isCommandDisabled = require('../util/check-command.js');
const {
  locale
} = require('../config.json');
const i18n = require('../i18n/i18n_' + locale + '.json');
const user = require('../util/user_handler.js');


module.exports = {
  name: 'top',
  execute(message) {

    if (isCommandDisabled(this.name)) return;

    let users = user.getEveryone();
    let ordered = users.sort(function(x, y){
      return y.level - x.level;
    });

    message.channel.send(`:first_place: ${ordered[0].username} ( Lvl.${ordered[0].level} )`);
    message.channel.send(`:second_place: ${ordered[1].username} ( Lvl.${ordered[1].level} )`);
    message.channel.send(`:third_place: ${ordered[2].username} ( Lvl.${ordered[2].level} )`);
  },
};
