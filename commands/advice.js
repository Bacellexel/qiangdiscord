const isCommandDisabled = require('../util/check-command.js');
const request = require('request');
const {
  locale
} = require('../config.json');
const i18n = require('../i18n/i18n_' + locale + '.json');

module.exports = {
  name: 'advice',
  execute(message) {

    //English data only coming from the api, so we'll make this command english only
    if(locale != 'en') return console.log(i18n.COMMAND_NOT_AVAILABLE + locale);
    if (isCommandDisabled(this.name)) return;

    request('https://api.adviceslip.com/advice', function(err, res, body){
      if(!err && res.statusCode === 200){
        message.channel.send(`${JSON.parse(body).slip.advice}`);
      }
      else{
        console.log(err);
      }
    });
  },
};
