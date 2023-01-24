const preferenceHelpers = require("./helper");

const resolvers = {
  Query: {
    async getAllPreferences() {
      return await preferenceHelpers.getAll();
    },
    async getSinglePreference(_, { id }, __, info) {
      const atr = requestedFields(info);

      return await preferenceHelpers.getOne(id, atr);
    },
    async getAllPreferencesByConsultant(_, args) {
      return await preferenceHelpers.getByConsultant(args.consultantID);
    },
  },
  Mutation: {
    async createPreference(_, { name }) {
      console.log(name);
      return await preferenceHelpers.create({ name });
    },
    async updatePreference(_, { input }) {
      return await preferenceHelpers.update(input);
    },
    async updatePreferences(_, { input, pId }) {
      return await preferenceHelpers.updateAll(
        {
          input,
        },
        pId
      );
    },
    async deletePreference(_, { id }) {
      return await preferenceHelpers.delete(id);
    },
  },
};
module.exports = resolvers;
