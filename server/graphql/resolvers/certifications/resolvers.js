const { ApolloError } = require("apollo-server-errors");
const certificationHelpers = require("./helper");

const resolvers = {
  Query: {
    async getAllCertifications() {
      return await certificationHelpers.getAll();
    },
    async getSingleCertification(_, id) {
      console.log(id);
      return await certificationHelpers.getOne(id.id);
    },
    async getAllCertificationsByConsultant(_, args) {
      return await certificationHelpers.getByConsultant(args.consultantId);
    },
  },
  Mutation: {
    async createCertification(_, { input }, { user }) {
      const cID = await certificationHelpers.create(input, user);
      if (!cID)
        throw new ApolloError("server_error", "error_creating_certification");
      return cID;
    },
    async updateCertification(_, { input }) {
      const upd = await certificationHelpers.update(input);
      if (!upd)
        throw new ApolloError("server_error", "error_updating_certification");
      return upd;
    },
    async updateCertifications(_, { input, pId }) {
      console.log({ input });
      return await certificationHelpers.updateAll(
        {
          input,
        },
        pId
      );
    },
    async deleteCertification(_, { id }) {
      const del = await certificationHelpers.delete(id);
      if (!del)
        throw new ApolloError("server_error", "error_deleting_certification");
      return del;
    },
  },
};
module.exports = resolvers;
