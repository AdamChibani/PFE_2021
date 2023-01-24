const { ApolloError } = require("apollo-server-errors");
const { requestedFields } = require("../../helpers/graphql.helper");
const educationHelpers = require("./helper");

const resolvers = {
  Query: {
    async getAllEducations() {
      return await educationHelpers.getAll();
    },
    async getSingleEducation(_, { id }, __, info) {
      const atr = requestedFields(info);
      return await educationHelpers.getOne(id, atr);
    },
    async getAllEducationsByConsultant(_, { consultantId }, __, info) {
      const atr = requestedFields(info);
      return await educationHelpers.getByConsultant(consultantId, atr);
    },
  },
  Mutation: {
    async createEducation(_, { input }, { user }) {
      const cID = await educationHelpers.create(input, user);
      if (!cID)
        throw new ApolloError("server_error", "error_creating_education");
      return cID;
    },
    async updateEducation(_, { input }, __, info) {
      const atr = requestedFields(info);

      const upd = await educationHelpers.update(input, atr);
      if (!upd)
        throw new ApolloError("server_error", "error_updating_education");
      return upd;
    },
    async updateEducations(_, { input, pId }) {
      return await educationHelpers.updateAll({ input }, pId);
    },
    async deleteEducation(_, { id }) {
      const del = await educationHelpers.delete(id);
      if (!del)
        throw new ApolloError("server_error", "error_deleting_education");
      return del;
    },
  },
};
module.exports = resolvers;
