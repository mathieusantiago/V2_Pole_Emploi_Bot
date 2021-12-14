const { MessageEmbed, WebhookClient } = require("discord.js");
const offreRegister = require("../models/idOffreRegister.model");
const config = require("../config");

const datas = [];
let flag;
async function test(offreID) {
  datas.push(await offreRegister.findById({ offreID: offreID }));
  return datas;
}

async function webhookHandle(api) {
  // use map to get all the API data
  var doubles = api.resultats.map(async (data) => {
    //create cosntant for recieving data call of API
    let money = "non renseigner";
    let offre = data;
    let offreID = await test(offre.id);

    for (var i = 0; i < offreID.length; i++) {
      if (offre.id === offreID[i]) {
        flag = 1;
      } else {
        flag = 0;
      }
    }
    if (flag !== 1) {
      const registerTrue = offreRegister.registerOffre({ offreID: offre.id });
    }
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
      .addField(":alarm_clock: duree de Travail ", timeWork1 + " " + timeWork2)
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
    const webhookClient = new WebhookClient({
      id: "912834760735330315",
      token:
        "nJjzcGQ6NkTS9Znt2-ebdEdzK-rpnin2XP69NnMnKNJBkWI_vx4pNy7jUHKVpWoSW6Z7",
    });

    //send message
    if (flag !== 1) {
      webhookClient.send({
        content: "Offre annonce Pôle Emploi",
        username: "Bot-Pôle-Emploi",
        avatarURL: "https://i.imgur.com/AfFp7pu.png",
        embeds: [embed],
      });
      console.log("↪ Message send");

      offre = "";

      offreID = [];
    } else {
      console.log("✕ Message already send");
      offre = "";

      offreID = [];
    }
    return data;
  });
  return doubles;
}
module.exports = webhookHandle;
