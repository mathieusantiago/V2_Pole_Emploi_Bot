const cron = require("node-cron");
const { callApi } = require("../helpers/callApi");
const webhookHandle = require("./webhooks.controller");
const config = require("../config");
//create function apiDiscord for send message to discord
async function apiDiscord(req, res) {
  console.log("✓ Webhook Ready");
  //get date from return call api function
  const result = await callApi(`${config.poleEmploi.callUrl}search?range=0-4&qualification=0&motsCles=developpeur`);
  api = await result.json()
  //send the api in to the embed function
  webhookHandle(api);
}

module.exports = {
  apiDiscord,
};
