const fs = require('fs');
const Discord = require('discord.js');
const {
  prefix,
  token,
  locale
} = require('./config.json');
const i18n = require('./i18n/i18n_' + locale + '.json');
const isFeatureDisabled = require('./util/check-command.js');
const userHandler = require('./util/user_handler.js');
const roleRewards = require('./data/levelrewards.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {

  if (!isFeatureDisabled("levelup")) {

    if (!userHandler.verify(message.author.username)) return;


          /* Dad feature */
    if(message.content.toLowerCase().includes(`'m`) || message.content.toLowerCase().includes(`am`) || message.content.toLowerCase().includes(`im`) && !isFeatureDisabled("dad")){
      let dadMessage = message.content.substring(3);
      message.channel.send(`Hey ${dadMessage}, I'm dad!`);
    }

        /* Level up feature */
    let expToAdd = Math.floor(Math.random() * 5) + 8;
    let user = userHandler.get(message.author.username);
    let nextLevel = ((user.level * 300));

    userHandler.setExp(message.author.username, expToAdd);

    if ((user.exp + expToAdd) >= nextLevel) {

      userHandler.setLevel(message.author.username, user.level + 1);
      let rewardHolder = null;
      if (!isFeatureDisabled('levelreward')) {
        user = userHandler.get(message.author.username);
        level = user.level;
        let rewards = roleRewards.forEach(function(reward) {
          if (reward.level === level) {
            rewardHolder = reward;
            userHandler.setCurrency(message.author.username, reward.currency);
            let roles = message.guild.roles;
            roles.forEach(function(role) {
              if (role.name === reward.roleName) {
                message.member.addRole(role.id);
              }
            });
          }
        });

      }

      let randomBillion = Math.floor(Math.random() * 100) + 1;
          // Don't tell me, I know !
      if (rewardHolder != null) {

        var embed = new Discord.RichEmbed()
          .setTitle('Level up!')
          .setColor('#D05E41')
          .setThumbnail(message.author.avatarURL)
          .addField('Level', user.level, true)
          .addField('Exp', (user.exp), true)
          .addField('Role gained', rewardHolder.roleName, true)
          .addField('Gold gained', rewardHolder.currency, true)
          .setFooter(`${randomBillion} billion exp until next level`, message.author.displayAvatarURL);
        message.channel.send(embed);
      } else {
        var embed = new Discord.RichEmbed()
          .setTitle('Level up!')
          .setColor('#D05E41')
          .setThumbnail(message.author.avatarURL)
          .addField('Level', user.level, true)
          .addField('Exp', (user.exp), true)
          .setFooter(`${randomBillion} billion exp until next level`, message.author.displayAvatarURL);
        message.channel.send(embed);
      }
    }
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (message.channel.type === 'dm') return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply(i18n.COMMANDE_EXECUTE_ERROR);
  }
});

client.login(token);
