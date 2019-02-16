const isCommandDisabled = require('../util/check-command.js');
const Discord = require('discord.js');
const {
  locale
} = require('../config.json');
const i18n = require('../i18n/i18n_' + locale + '.json');

module.exports = {
  name: 'serverinfo',
  execute(message, args) {

    if (isCommandDisabled(this.name)) return;
    if (!message.guild.available) return;

    var guild = message.guild;

    var serverEmbed = new Discord.RichEmbed()
      .setColor('#00FF00')
      .setTitle(i18n.SERVER_INFO)
      .setDescription(i18n.INFO_ABOUT + guild.name)
      .setThumbnail(guild.iconURL)
      .addField(i18n.CREATION_DATE, guild.createdAt, true)
      .addField(i18n.MEMBERS, guild.memberCount, true)
      .addField(i18n.OWNER, guild.owner, true)
      .addField(i18n.REGION, guild.region, true)
      .addField(i18n.ROLES, `${guild.roles.array().length}`, true)
      .setTimestamp()
      .setFooter('https://github.com/Bacellexel', guild.iconURL);

    message.channel.send(serverEmbed);
  },
};
