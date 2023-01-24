"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";

const config = require(__dirname + "/../config/config.js")[env];

const dbConfig = config.db;

const basename = path.basename(__filename);
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  {
    ...dbConfig,
    hooks: {
      beforeDefine: function (columns, model) {
        model.tableName = "tbl_" + model.tableName;
      },
    },
    define: {
      timestamps: true,
      underscored: true,
    },
    logging: (...msg) => {
      sqLogger.info(msg[0]);
    },
  }
);

// Initiating models names if diffrent from schma's
db.gqlNames = { a: [], b: [] };

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    let modelFile = require("./" + file);
    if (modelFile && typeof modelFile.default === "function")
      modelFile = modelFile;
    const model = modelFile(sequelize, Sequelize);
    db[model.name] = model;
    // Injecting models names if diffrent from schma's
    if (model.gqlName && model.gqlName !== model.name) {
      db.gqlNames.a.push(model.gqlName);
      db.gqlNames.b.push(model.name);
    }
    if (Array.isArray(model.gqlNames)) {
      model.gqlNames.map((gqlName) => {
        db.gqlNames.a.push(gqlName);
        db.gqlNames.b.push(model.name);
      });
    }
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
  if (db[modelName].defaultData) {
    db[modelName].defaultData(db[modelName]);
  }
});

db.sequelize = sequelize;
// sequelize.sync({ force: true });
// sequelize.sync();
module.exports = db;
