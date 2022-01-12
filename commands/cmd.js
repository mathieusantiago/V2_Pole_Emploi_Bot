const { MessageEmbed } = require("discord.js");
const config = require("../config");
module.exports = {
  name: "cmd",
  description: "Liste toutes les commandes du bot Pôle Emploi",

  execute(message, args, bot) {
    const userName = message.author.username;

    const log_channel = bot.channels.cache.get(config.discord.log_channel);
    const embed = new MessageEmbed() 

      .setTitle(`:notepad_spiral: Liste des commandes`) 
      .setAuthor(
        "Pôle Emploi",
        "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c0/Logo_P%C3%B4le_Emploi_2008.svg/2560px-Logo_P%C3%B4le_Emploi_2008.svg.png",
        "https://www.pole-emploi.fr/accueil/" 
      )
      .setDescription(
        "!salut : Présentation du bot \n !cmd : Liste des commandes \n !search : Création d'un channel de recherche  \n !city département  : Effectuer une recherche par département \n !job mot clé département  : Effectuer une recherche par met clé et département"
      )
      .setColor("#00b0f4")
      .setThumbnail(
        "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c0/Logo_P%C3%B4le_Emploi_2008.svg/2560px-Logo_P%C3%B4le_Emploi_2008.svg.png"
      );
    message.channel
      .send({
        content: "Présentation bot Pôle Emploi",
        username: "Bot-Pôle-Emploi",
        avatarURL: "https://i.imgur.com/AfFp7pu.png",
        embeds: [embed],
      })
      .then((message) => {
        const embed = new MessageEmbed()
          .setTitle(`:sunny: CMD:[!cmd] user ${userName} message send channel: ${message.channel} !!!`)
          .setColor("#00b0f4");
        log_channel.send({ embeds: [embed] });

        console.log(`CMD:[!cmd] user ${userName} message send  ${message.channel} !!!`);
      })
      .catch((err) => {
        const embed = new MessageEmbed()
          .setTitle(
            `:sunny: CMD:[!cmd] user ${userName} an error while send message : err ${message.channel}`
          )
          .setColor("#00b0f4");
        log_channel.send({ embeds: [embed] });

        console.log(`CMD:[!cmd] user ${userName} an error while send message : err ${err}`);
      });
  },
};
