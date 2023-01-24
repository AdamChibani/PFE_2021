const messagerieHelpers = require("./helper");
const { requestedFields } = require("../../helpers/graphql.helper");
const resolvers = {
  Query: {
    async getMessagerieByConsultant(_, { id }, __, info) {
      const atr = requestedFields(info);
      return await messagerieHelpers.getByUser(id, atr);
    },
    async getUnopenedMessagerie(_, { id }, __, info) {
      const atr = requestedFields(info);
      return await messagerieHelpers.getUnopened(id, atr);
    },
    async getOpenedMessagerie(_, { id }, __, info) {
      const atr = requestedFields(info);
      return await messagerieHelpers.getOpened(id, atr);
    },
    async getCount(_, { id }, __, info) {
      const atr = requestedFields(info);

      return await messagerieHelpers.count(id, atr);
    },
    async getCountAll(_, { id }, __, info) {
      const atr = requestedFields(info);

      return await messagerieHelpers.countAll(id, atr);
    },
  },
  Mutation: {
    async createMessagerie(_, { senderID, subject, receiver }) {
      return await messagerieHelpers.create({ senderID, subject, receiver });
    },
    async deleteMessagerie(_, { id }) {
      return await messagerieHelpers.delete(id);
    },
  },
};
module.exports = resolvers;
