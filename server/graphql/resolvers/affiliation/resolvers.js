const { ApolloError } = require("apollo-server-errors");
const affiliationHelpers = require("./helper");

const resolvers = {
  Query: {
    async getAllAffiliations() {
      return await affiliationHelpers.getAll();
    },
    async getSingleAffiliation(_, id) {
      console.log(id);
      return await affiliationHelpers.getOne(id.id);
    },
    async getAllAffiliationsByConsultant(_, args) {
      return await affiliationHelpers.getByConsultant(args.consultantId);
    },
  },
  Mutation: {
    async createAffiliation(_, { input }, { user }) {
      const cID = await affiliationHelpers.create(input, user);
      if (!cID)
        throw new ApolloError("server_error", "error_creating_affiliation");
      return cID;
    },
    async updateAffiliation(_, { input }) {
      const upd = await affiliationHelpers.update(input);
      if (!upd)
        throw new ApolloError("server_error", "error_updating_affiliation");
      return upd;
    },
    async deleteAffiliation(_, { id }) {
      const del = await affiliationHelpers.delete(id);
      if (!del)
        throw new ApolloError("server_error", "error_deleting_affiliation");
      return del;
    },
  },
};
module.exports = resolvers;
