"use strict";

const app = require("../../server/server");

const dbConnect = () =>
  new Promise((resolve, reject) => {
    const model = app.models.Word;
    model.getDataSource().connector.connect((err, db) => {
      if (err) return reject(err);
      resolve(db);
    });
  });

module.exports = function (Word) {
  Word.validatesUniquenessOf("word");

  Word.getRandomWord = async () => {
    const db = await dbConnect();
    const collection = db.collection("Word");
    const pipeline = [{ $sample: { size: 1 } }];
    const pupils = await collection.aggregate(pipeline);
    return pupils.toArray();
  };

  Word.remoteMethod("getRandomWord", {
    returns: { arg: "data" },
    http: { path: "/random", verb: "get" },
  });
};
