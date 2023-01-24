const { ApolloError } = require("apollo-server-errors");
const diplomaHelpers = require("./helper");

const resolvers = {
  Query: {
    async getAllDiplomas() {
      return await diplomaHelpers.getAll();
    },
    async getSingleDiploma(_, id) {
      console.log(id);
      return await diplomaHelpers.getOne(id.id);
    },
    async getAllDiplomasByEducation(_, args) {
      return await diplomaHelpers.getByEducation(args.educationId);
    },
  },
  Mutation: {
    async createDiploma(_, { diploma }, { user }) {
      const cID = await diplomaHelpers.create(diploma, user);
      if (!cID) throw new ApolloError("server_error", "error_creating_diploma");
      return cID;
    },
    async updateDiploma(_, { input }) {
      const upd = await diplomaHelpers.update(input);
      if (!upd) throw new ApolloError("server_error", "error_updating_diploma");
      return upd;
    },
    async deleteDiploma(_, { id }) {
      const del = await diplomaHelpers.delete(id);
      if (!del) throw new ApolloError("server_error", "error_deleting_diploma");
      return del;
    },
  },
};
module.exports = resolvers;
