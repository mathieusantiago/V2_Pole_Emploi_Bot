const { MessageEmbed, WebhookClient } = require("discord.js");
const defaultText =
  "Non renseigné. Plus de détails en cliquant sur le titre de l'offre";
const config = require("../config");
const { callApi } = require("../helpers/callApi");

module.exports = {
  name: "city",
  description: "Liste toutes les commandes du bot Pôle Emploi",

  async execute(message, args, bot) {
    const userName = message.author.username;
    const log_channel = bot.channels.cache.get(config.discord.log_channel);
    const result = await callApi(
      `${config.poleEmploi.callUrl}search?range=0-4&qualification=0&departement=${args}&motsCles=developpeur`
    );

    if (result.stat === 206) {
      api = await result.json();
      api.resultats.map(async (data) => {
        //create cosntant for recieving data call of API
        let money = "non renseigné";
        //if salary is undefined
        if (data.salaire.libelle === undefined) {
          money =
            data && data.salaire && data.salaire.commentaire
              ? data.salaire.commentaire
              : defaultText;
        } else {
          money =
            data && data.salaire && data.salaire.libelle
              ? data.salaire.libelle
              : defaultText;
        }

        //ues message builder to create message
        const embed = new MessageEmbed()
          .setTitle(
            `:computer: ${data.intitule.substring(0, 256) || defaultText}`
          )
          .setAuthor(
            "Pôle Emploi",
            "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c0/Logo_P%C3%B4le_Emploi_2008.svg/2560px-Logo_P%C3%B4le_Emploi_2008.svg.png",
            "https://www.pole-emploi.fr/accueil/"
          )
          .setURL(data.origineOffre.urlOrigine || defaultText)
          .addField(
            ":date: Date de création ",
            data.dateCreation || defaultText
          )
          .addField(
            ":bust_in_silhouette: Nom du Contact  ",
            "**" + data.contact.nom || defaultText + "**"
          )
          .addField(
            ":factory: Nom de l'entreprise ",
            data.entreprise.nom || defaultText
          )
          .addField(
            ":map: Lieu de travail ",
            data.lieuTravail.libelle || defaultText
          )
          .addField(
            ":bookmark_tabs: Type de contrat ",
            data.typeContratLibelle || defaultText
          )
          .addField(
            ":alarm_clock: durée de Travail ",
            data.dureeTravailLibelleConverti ||
              data.dureeTravailLibelle + " " + timeWork2
          )
          .addField("\u200b", ":money_with_wings: Salaire ", money, "\u200b")
          .addField(
            ":bar_chart: Expérience demandée ",
            data.experienceLibelle || defaultText
          )
          .addField(
            ":man_student: Formation demandée ",
            "Domaine : " + data.formations[0].domaineLibelle ||
              defaultText +
                " Niveau d'étude : " +
                data.formations[0].niveauLibelle ||
              defaultText
          )
          .addField(
            ":information_source: Description ",
            data.description.substring(0, 1000) || defaultText
          )
          .setColor("#00b0f4")
          .setThumbnail(
            "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c0/Logo_P%C3%B4le_Emploi_2008.svg/2560px-Logo_P%C3%B4le_Emploi_2008.svg.png"
          )
          .setImage("http://placeimg.com/800/400/tech");

        //send message
        message.channel
          .send({
            content: "Offre annonce Pôle Emploi",
            username: "Bot-Pôle-Emploi",
            avatarURL: "https://i.imgur.com/AfFp7pu.png",
            embeds: [embed],
          })
          .then((message) => {
            const embed = new MessageEmbed()
              .setTitle(
                `:sunny: CMD:[!city ${args}] message send by ${userName} channel: ${message.channel} !!!`
              )
              .setColor("#00b0f4");
            log_channel.send({ embeds: [embed] });

            console.log(
              `CMD:[!city] message send by ${userName} channel: ${message.channel} !!!`
            );
          })
          .catch((err) => {
            const embed = new MessageEmbed()
              .setTitle(
                `:sunny: CMD:[!city] user ${userName} an error while send message : err ${message.channel}`
              )
              .setColor("#00b0f4");
            log_channel.send({ embeds: [embed] });
            console.log(
              `CMD:[!city]user ${userName} an error while send message : err ${err}`
            );
          });
        console.log("↪ Message send");

        return data;
      });
    } else {
      message.channel.send(
        "Il n'y a pas d'offre pour ce département ou le département n'existe pas !"
      );
      const embed = new MessageEmbed()
        .setTitle(
          `:sunny: CMD:[!city] status ${result.stat} an error while send message `
        )
        .setColor("#00b0f4");
      log_channel.send({ embeds: [embed] });
      console.log(
        `CMD:[!city]status ${result.stat} an error while send message`
      );
    }
  },
};
