const officeHelpers = require("./helper");
const { requestedFields } = require("../../helpers/graphql.helper");

const resolvers = {
  Query: {
    async getAllOffices(_, { id }, __, info) {
      const atr = requestedFields(info);

      return await officeHelpers.getAll(id, atr);
    },
  },
  Mutation: {
    async updateOffices(_, { input }) {
      console.log({ input });
      return await officeHelpers.updateAll({
        input,
      });
    },
  },
};
module.exports = resolvers;
