const { ApolloError } = require("apollo-server-errors");
const projectHelpers = require("./helper");

const resolvers = {
  Query: {
    async getAllProjects() {
      return await projectHelpers.getAll();
    },
    async getSingleProject(_, id) {
      console.log(id);
      return await projectHelpers.getOne(id.id);
    },
    async getAllProjectsByConsultant(_, { id }) {
      return await projectHelpers.getByConsultant(id);
    },
  },
  Mutation: {
    async createProject(_, { input }, { user }) {
      const cID = await projectHelpers.create(input, user);
      if (!cID) throw new ApolloError("server_error", "error_creating_project");
      return cID;
    },
    async updateProject(_, { input }) {
      const upd = await projectHelpers.update(input);
      if (!upd) throw new ApolloError("server_error", "error_updating_project");
      return upd;
    },
    async updateProjects(_, { input, pId }) {
      const upd = await projectHelpers.updateAll({ input }, pId);
      if (!upd)
        throw new ApolloError("server_error", "error_updating_projects");
      return upd;
    },
    async deleteProject(_, { id }) {
      const del = await projectHelpers.delete(id);
      if (!del) throw new ApolloError("server_error", "error_deleting_project");
      return del;
    },
  },
};
module.exports = resolvers;
