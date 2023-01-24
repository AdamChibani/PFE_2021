const { ApolloError } = require("apollo-server-errors");
const experienceHelpers = require("./helper");

const resolvers = {
  Query: {
    async getAllExperiences() {
      return await experienceHelpers.getAll();
    },
    async getSingleExperience(_, id) {
      console.log(id);
      return await experienceHelpers.getOne(id.id);
    },
    async getAllExperiencesByConsultant(_, { id }) {
      return await experienceHelpers.getByConsultant(id);
    },
  },
  Mutation: {
    async createExperience(_, { input }, { user }) {
      const cID = await experienceHelpers.create(input, user);
      if (!cID)
        throw new ApolloError("server_error", "error_creating_experience");
      return cID;
    },
    async updateExperience(_, { input }) {
      const upd = await experienceHelpers.update(input);
      if (!upd)
        throw new ApolloError("server_error", "error_updating_experience");
      return upd;
    },
    async updateExperiences(_, { input, pId }) {
      const upd = await experienceHelpers.updateAll({ input }, pId);
      if (!upd)
        throw new ApolloError("server_error", "error_updating_experiences");
      return upd;
    },
    async deleteExperience(_, { id }) {
      const del = await experienceHelpers.delete(id);
      if (!del)
        throw new ApolloError("server_error", "error_deleting_experience");
      return del;
    },
  },
};
module.exports = resolvers;
