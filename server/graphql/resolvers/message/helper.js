const { ApolloError } = require("apollo-server-errors");
const graphqlHelper = require("../../helpers/graphql.helper");

const { Message, Messagerie } = require("../../../database/models");
const messageHelpers = {
  async getAll(mId, requestedFields) {
    const include = graphqlHelper.getIncludesFields(requestedFields);

    return await Message.findAll({ where: { messagerie_id: mId }, include });
  },
  async create(mId, aId, content, requestedFields) {
    const include = graphqlHelper.getIncludesFields(requestedFields);
    m = await Messagerie.findByPk(mId);
    await m.update({ opened: true });
    return await Message.create({
      content,
      sender_id: aId,
      messagerie_id: mId,
    });
  },
  async create2(mId, aId, content, requestedFields) {
    return await Message.create({
      content,
      sender_id: aId,
      messagerie_id: mId,
    });
  },
};
module.exports = messageHelpers;
