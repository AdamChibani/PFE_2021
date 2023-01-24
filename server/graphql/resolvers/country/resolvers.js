const countryHelpers = require("./helper");
const { requestedFields } = require("../../helpers/graphql.helper");

const resolvers = {
  Query: {
    async getAllCountries(_, __, ___, info) {
      const atr = requestedFields(info);

      return await countryHelpers.getAll(atr);
    },
    async getCountryByName(_, { name }) {
      console.log("object");
      console.log(name);
      return await countryHelpers.getByName(name);
    },
  },
  Mutation: {
    async updateLinks(_, { input }) {
      console.log(input);
      return await countryHelpers.updateLink(input);
    },
  },
};
module.exports = resolvers;
