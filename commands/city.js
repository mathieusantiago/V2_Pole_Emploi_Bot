const { MessageEmbed, WebhookClient } = require("discord.js");

const config = require("../config");
const { callApi } = require("../helpers/callApi");
module.exports = {
  name: "city",
  description: "Liste toute les commandes du bot Pôle Emploi",

  async execute(message, args, bot) {
    const userName = message.author.username;

    const log_channel = bot.channels.cache.get("916359387419934740");
    const result = await callApi(
      `${config.poleEmploi.callUrl}search?range=0-4&qualification=0&departement=${args}&motsCles=developpeur`
    );
    console.log("result");
    console.log(result.status);
    if (result.stat === 206) {
      api = await result.json();
      var doubles = api.resultats.map(async (data) => {
        //create cosntant for recieving data call of API
        let money = "non renseigner";
        let offre = data;

        //recieve data of title (developpeur junior)
        const setTitle =
          offre && offre.intitule
            ? offre.intitule.substring(0, 256)
            : "Non renseigné plus de détaille en cliquant sur le titre de l'offre";
        //recieve data of url offre (https://www.pole-emploi.fr/offres/2718097)
        const setURL =
          offre && offre.origineOffre && offre.origineOffre.urlOrigine
            ? offre.origineOffre.urlOrigine
            : "Non renseigné plus de détaille en cliquant sur le titre de l'offre";
        //recieve data of the offre (2021-11-10T16:52:53.000Z)
        const dataCreate =
          offre && offre.dateCreation
            ? offre.dateCreation
            : "Non renseigné plus de détaille en cliquant sur le titre de l'offre";
        //recieve data of name of create offre (Micheline)
        const contactName =
          offre && offre.contact && offre.contact.nom
            ? offre.contact.nom
            : "Non renseigné plus de détaille en cliquant sur le titre de l'offre";
        //recieve data of companie (Micheline ink)
        const companieName =
          offre && offre.entreprise && offre.entreprise.nom
            ? offre.entreprise.nom
            : "Non renseigné plus de détaille en cliquant sur le titre de l'offre";
        //recieve data of city (dubai)
        const city =
          offre && offre.lieuTravail && offre.lieuTravail.libelle
            ? offre.lieuTravail.libelle
            : "Non renseigné plus de détaille en cliquant sur le titre de l'offre";
        //recieve data of contrat (CDI CDD ...)
        const typeContract =
          offre && offre.typeContratLibelle
            ? offre.typeContratLibelle
            : "Non renseigné plus de détaille en cliquant sur le titre de l'offre";
        //recieve data of contrat (35h/semaine)
        const timeWork1 =
          offre && offre.dureeTravailLibelleConverti
            ? offre.dureeTravailLibelleConverti
            : "Non renseigné plus de détaille en cliquant sur le titre de l'offre";
        const timeWork2 =
          offre && offre.dureeTravailLibelle
            ? offre.dureeTravailLibelle
            : "Non renseigné plus de détaille en cliquant sur le titre de l'offre";
        //if salary is undefined
        if (offre.salaire.libelle === undefined) {
          money =
            offre && offre.salaire && offre.salaire.commentaire
              ? offre.salaire.commentaire
              : "Non renseigné plus de détaille en cliquant sur le titre de l'offre";
        } else {
          money =
            offre && offre.salaire && offre.salaire.libelle
              ? offre.salaire.libelle
              : "Non renseigné plus de détaille en cliquant sur le titre de l'offre";
        }
        //recieve data of experience
        const experience =
          offre && offre.experienceLibelle
            ? offre.experienceLibelle
            : "Non renseigné plus de détaille en cliquant sur le titre de l'offre";
        //recieve data of niveau d'etude
        const learn1 =
          offre &&
          offre.formations &&
          offre.formations[0] &&
          offre.formations[0].domaineLibelle
            ? offre.formations[0].domaineLibelle
            : "Non renseigné plus de détaille en cliquant sur le titre de l'offre";
        const learn2 =
          offre &&
          offre.formations &&
          offre.formations[0] &&
          offre.formations[0].niveauLibelle
            ? offre.formations[0].niveauLibelle
            : "Non renseigné plus de détaille en cliquant sur le titre de l'offre";
        //recieve data of description
        const description =
          offre && offre.description
            ? offre.description.substring(0, 1000)
            : "Non renseigné plus de détaille en cliquant sur le titre de l'offre";
        //ues message builder to create message

        const embed = new MessageEmbed()

          .setTitle(`:computer: ${setTitle}`)
          .setAuthor(
            "Pôle Emploi",
            "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c0/Logo_P%C3%B4le_Emploi_2008.svg/2560px-Logo_P%C3%B4le_Emploi_2008.svg.png",
            "https://www.pole-emploi.fr/accueil/"
          )
          .setURL(setURL)
          .addField(":date: Date de création ", dataCreate)
          .addField(
            ":bust_in_silhouette: Nom du Contact  ",
            "**" + contactName + "**"
          )
          .addField(":factory: Nom de l'entreprise ", companieName)
          .addField(":map: Lieux de travail ", city)
          .addField(":bookmark_tabs: Type de contrat ", typeContract)
          .addField(
            ":alarm_clock: duree de Travail ",
            timeWork1 + " " + timeWork2
          )
          .addField("\u200b", ":money_with_wings: Salaire ", money, "\u200b")
          .addField(":bar_chart: Experience demandée ", experience)
          .addField(
            ":man_student: Formation demandée ",
            "Domaine : " + learn1 + " Niveau d'étude : " + learn2
          )
          .addField(":information_source: Description ", description)
          .setColor("#00b0f4")
          .setThumbnail(
            "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c0/Logo_P%C3%B4le_Emploi_2008.svg/2560px-Logo_P%C3%B4le_Emploi_2008.svg.png"
          )
          .setImage("http://placeimg.com/800/400/tech");
        // picture.img[(Math.floor(Math.random() * 80))].src.medium
        //use discord webhook to send message

        //send message
        let test = "918091841394597888";
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
      message.channel.send("il n'y a pas d'offre pour ce département ou le département n'existe pas !");

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
