const { MessageEmbed } = require("discord.js");
const config = require("../config");
module.exports = {
  name: "salut",
  description: "Présentation du bot Pôle Emploi",

  execute(message, args, bot) {
    const userName = message.author.username;

    const log_channel = bot.channels.cache.get(config.discord.log_channel);
    const embed = new MessageEmbed()

      .setTitle(`:wave: Salut je suis le bot pôle-emploi`)
      .setAuthor(
        "Pôle Emploi",
        "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c0/Logo_P%C3%B4le_Emploi_2008.svg/2560px-Logo_P%C3%B4le_Emploi_2008.svg.png",
        "https://www.pole-emploi.fr/accueil/"
      )
      .setDescription(
        "Avec moi tu va pouvoir rechercher des offres d'emploi \n grace a mes commandes que tu pourras voir en utilisant la commande !cmd"
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
          .setTitle(
            `:sunny:  CMD:[!salut] user ${userName} message send channel: ${message.channel } !!!`
          )
          .setColor("#00b0f4");
        log_channel.send({ embeds: [embed] });

        console.log(`CMD:[!salut] user ${userName} message send channel: ${message.channel}  !!!`);
      })
      .catch((err) => {
        const embed = new MessageEmbed()
          .setTitle(
            `:thunder_cloud_rain: CMD:[!salut] user ${userName}  message errors channel: ${message.channel}!!!`
          )
          .setColor("#00b0f4");
        log_channel.send({ embeds: [embed] });

        console.log(`CMD:[!salut] user ${userName} an error while send message : err ${err}`); // "zut !"
      });
  },
};
