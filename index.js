const config = require("./config");
const fs = require("fs");
const prefix = config.discord.prefix;

const cron = require("node-cron");
const mongo = require("./helpers/mongo");
const { apiDiscord } = require("./webhooks/apiDiscord");

const { Client, Intents, MessageEmbed, Collection } = require("discord.js");

const bot = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

bot.commands = new Collection();
const commandFils = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFils) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

//create cron function for execute apiDiscord function
//every 5 minute in dev mode and every 1 hour in production mode
cron.schedule("*/5 * * * *", () => {
  apiDiscord();
});

bot.once("ready", () => {
  console.log(`✓ Bot Ready`);
  mongo.connect();
});

bot.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (!bot.commands.has(command)) return;
  bot.commands.get(command).execute(message, args, bot);
});

bot.login(config.discord.token);
