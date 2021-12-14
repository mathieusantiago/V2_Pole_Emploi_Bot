const { ObjectID } = require("mongodb");
const mongo = require("../helpers/mongo");

async function registerOffre({ offreID }) {
  const db = await mongo.getConnection();
  const record = await db.collection("test").insert({
    offreID: offreID,
    active: true,
    created_at: new Date(),
  });
  return record.ops[0];
}

async function findById({ offreID }) {
  const db = await mongo.getConnection();

  const result = await db.collection("test").findOne({
    offreID: offreID,
  });
  if (result === null) {
    return null;
  }

  return result.offreID;
}

module.exports = {
  registerOffre,
  findById,
};
