const languageHelpers = require("./helper");

const resolvers = {
  Query: {
    async getAllLanguages() {
      return await languageHelpers.getAll();
    },
    async getSingleLanguage(_, id) {
      return await languageHelpers.getOne(id.id);
    },
    async getAllLanguagesByConsultant(_, { id }) {
      console.log(id);
      return await languageHelpers.getByConsultant(id);
    },
  },
  Mutation: {
    async createLanguage(_, args) {
      return await languageHelpers.create(args);
    },
    async updateLanguage(_, { input }) {
      return await languageHelpers.update(input);
    },
    async updateLanguages(_, { input, pId }) {
      return await languageHelpers.updateAll(
        {
          input,
        },
        pId
      );
    },
    async deleteLanguage(_, id) {
      return await languageHelpers.delete(id.id);
    },
    async setLanguageToUser(_, { id }, { user }) {
      return await languageHelpers.setLanguage(id, user);
    },
  },
};
module.exports = resolvers;
