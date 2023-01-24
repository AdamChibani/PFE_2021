const { ApolloError } = require("apollo-server-errors");
const majorHelpers = require("./helper");

const resolvers = {
  Query: {
    async getAllMajors() {
      return await majorHelpers.getAll();
    },
    async getSingleMajor(_, id) {
      console.log(id);
      return await majorHelpers.getOne(id.id);
    },
    async getAllMajorsByEducation(_, args) {
      return await majorHelpers.getByEducation(args.educationId);
    },
  },
  Mutation: {
    async createMajor(_, { input }, { user }) {
      const cID = await majorHelpers.create(input, user);
      if (!cID) throw new ApolloError("server_error", "error_creating_major");
      return cID;
    },
    async updateMajor(_, { input }) {
      const upd = await majorHelpers.update(input);
      if (!upd) throw new ApolloError("server_error", "error_updating_major");
      return upd;
    },
    async deleteMajor(_, { id }) {
      const del = await majorHelpers.delete(id);
      if (!del) throw new ApolloError("server_error", "error_deleting_major");
      return del;
    },
  },
};
module.exports = resolvers;
