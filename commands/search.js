const Timer = 900000;
const { MessageEmbed } = require("discord.js");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = {
  name: "search",
  description: "Créer un channel de recherche sur le bot Pôle Emploi",

  execute(message, args, bot) {
    const userName = message.author.username;

    const log_channel = bot.channels.cache.get("916359387419934740");
    const embed = new MessageEmbed()
      .setTitle(
        `:sunny: CMD:[!search]channel search of ${message.author.username} created`
      )
      .setColor("#00b0f4");
    log_channel.send({ embeds: [embed] });
    console.log(`CMD:[!search]channel search of ${message.author.username} created`);
    message.guild.channels
      .create(`search of ${message.author.username}`, {
        type: "text",
        parent: "644488442788577281",
        permissionOverwrites: [
          {
            id: message.guild.id,
            deny: ["SEND_MESSAGES"],
            allow: ["ADD_REACTIONS"],
          },
        ],
      })
      .then(async (channel_search) => {
        channel_search.send(
          "`Bonjour bienvenue sur ce channel de recherche,\n ce channel restera acctif 15 minute !!!\n Il sera supprimer automatiquement a la suit de ces 15 minute!!! `"
        );
        await sleep(Timer);
        channel_search.delete();
        const embed = new MessageEmbed()
          .setTitle(
            `:sunny: CMD:[!search] user ${userName} deleted Channel ${channel_search.name}`
          )
          .setColor("#00b0f4");
        log_channel.send({ embeds: [embed] });
        console.log(`CMD:[!search] user ${userName} deleted Channel ${channel_search.name}`);
      })
      .catch((err) => {
        const embed = new MessageEmbed()
          .setTitle(
            `:sunny: CMD:[!search] Channel An error while creating or deleting :err ${err} `
          )
          .setColor("#00b0f4");
        log_channel.send({ embeds: [embed] });
        console.log(
          `CMD:[!search] user ${userName} An error while creating or deleting the channel : err${err}`
        );
      });
  },
};
