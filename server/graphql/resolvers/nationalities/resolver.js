const nationalityHelpers = require("./helpers");

const resolvers = {
  Query: {
    async getAllNationalities() {
      return await nationalityHelpers.getAll();
    },
  },
};
module.exports = resolvers;
