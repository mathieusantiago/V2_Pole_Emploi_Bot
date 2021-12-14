const MongoClient = require("mongodb").MongoClient;

const config = require("../config");

let connection;

async function connect() {
  connection = await MongoClient.connect(config.db.uri);
  return connection;
}

async function getConnection() {
  if (connection) return connection;
  await connect();
  return connection;
}

module.exports = {
  connect,
  getConnection,
};
