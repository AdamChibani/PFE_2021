const messageHelpers = require("./helper");
const { requestedFields } = require("../../helpers/graphql.helper");

const resolvers = {
  Query: {
    async getAllMessages(_, { messagerieId }, __, info) {
      const attributes = requestedFields(info);

      return await messageHelpers.getAll(messagerieId, attributes);
    },
  },
  Mutation: {
    async createMessage(_, { messagerieId, authorId, content }, __, info) {
      const attributes = requestedFields(info);

      const r = await messageHelpers.create(
        messagerieId,
        authorId,
        content,
        attributes
      );
      console.log(r);
      return r;
    },
    async createFirstMsg(_, { messagerieId, authorId, content }, __, info) {
      const attributes = requestedFields(info);

      const r = await messageHelpers.create2(
        messagerieId,
        authorId,
        content,
        attributes
      );
      console.log(r);
      return r;
    },
  },
};
module.exports = resolvers;
