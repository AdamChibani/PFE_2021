const { ApolloError } = require("apollo-server-errors");
const { QueryTypes } = require("sequelize");
const Sequelize = require("sequelize");
const {
  Messagerie,
  ReceiverMessagerie,
  Profile,
} = require("../../../database/models");
const graphqlHelper = require("../../helpers/graphql.helper");
const env = process.env.NODE_ENV || "development";

const config = require(__dirname + "../../../../database/config/config.js")[
  env
];

const dbConfig = config.db;
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
const messagerieHelpers = {
  async getByUser(id, requestedFields) {
    const include = graphqlHelper.getIncludesFields(requestedFields);
    const r = await ReceiverMessagerie.findAll({ where: { receiver_id: id } });
    let ids = [];
    r.forEach((data) => {
      ids.push(data.messagerieId);
    });
    return await Messagerie.findAll({ include, where: { id: ids } });
  },
  async getUnopened(id, requestedFields) {
    const include = graphqlHelper.getIncludesFields(requestedFields);
    const r = await ReceiverMessagerie.findAll({ where: { receiver_id: id } });
    let ids = [];
    r.forEach((data) => {
      ids.push(data.messagerieId);
    });
    return await Messagerie.findAll({
      include,
      where: { id: ids, opened: false },
    });
  },
  async getOpened(id, requestedFields) {
    const include = graphqlHelper.getIncludesFields(requestedFields);
    const r = await ReceiverMessagerie.findAll({ where: { receiver_id: id } });
    let ids = [];
    r.forEach((data) => {
      ids.push(data.messagerieId);
    });
    return await Messagerie.findAll({
      include,
      where: { id: ids, opened: true },
    });
  },
  async create(args) {
    console.log(args);
    const r = await Messagerie.create({
      sender_id: args.senderID,
      subject: args.subject,
      opened: false,
    }).catch(() => {
      throw new ApolloError("server_error", "error_creating_messagerie");
    });
    args.receiver.forEach(async (c) => {
      await Profile.findByPk(c).then(async (d) => {
        console.log({ d });
        await ReceiverMessagerie.create({
          messagerie_id: r.dataValues.id,
          receiver_id: d.user_id,
        });
      });
    });
    return r;
  },
  async delete(id) {
    return await Messagerie.destroy({
      where: {
        id,
      },
    })
      .catch((error) => {
        console.log(error);
        return false;
      })
      .then(() => {
        return true;
      });
  },
  async count(id, requestedFields) {
    const include = graphqlHelper.getIncludesFields(requestedFields);
    const r = await ReceiverMessagerie.findAll({ where: { receiver_id: id } });
    let ids = [];
    r.forEach((data) => {
      ids.push(data.messagerieId);
    });
    return await Messagerie.count({
      include,
      where: { id: ids, opened: false },
    });
  },
  async countAll(id) {
    return await ReceiverMessagerie.count({
      where: { receiver_id: id },
    });
  },
};

module.exports = messagerieHelpers;
