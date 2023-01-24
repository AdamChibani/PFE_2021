const { ApolloError } = require("apollo-server-errors");
const companyHelpers = require("./helper");
const { requestedFields } = require("../../helpers/graphql.helper");

const resolvers = {
  Query: {
    async getAllCompanies(_, __, ___, info) {
      const atr = requestedFields(info);
      return await companyHelpers.getAll(atr);
    },
    async getAllAgencies(_, __, ___, info) {
      const atr = requestedFields(info);
      return await companyHelpers.getAgencies(atr);
    },
    async getAllEnterprises(_, __, ___, info) {
      const atr = requestedFields(info);
      return await companyHelpers.getEnterprises(atr);
    },
    async getSingleCompany(_, id) {
      console.log(id);
      return await companyHelpers.getOne(id.id);
    },
    async getCompanyByAdmin(_, { id }, __, info) {
      const atr = requestedFields(info);

      return await companyHelpers.getCompByadmin(id, atr);
    },
    async getAgenciesConsultants(_, { id }, __, info) {
      const atr = requestedFields(info);

      return await companyHelpers.getConsult(id, atr);
    },
    async getAgenciesWorkers(_, { id, profile }, __, info) {
      const atr = requestedFields(info);

      return await companyHelpers.getWorkers(id, profile, atr);
    },
  },
  Mutation: {
    async createAgency(_, { input }, { user }) {
      const cID = await companyHelpers.create(input, user);
      if (!cID) throw new ApolloError("server_error", "error_creating_company");
      return cID;
    },
    async createEnterprise(_, { input }, { user }) {
      const cID = await companyHelpers.create2(input, user);
      if (!cID) throw new ApolloError("server_error", "error_creating_company");
      return cID;
    },
    async updateAgency(_, { input }, { user }) {
      const upd = await companyHelpers.update(input, user);
      if (!upd) throw new ApolloError("server_error", "error_updating_company");
      return upd;
    },
    async deleteCompany(_, { id }) {
      const del = await companyHelpers.delete(id);
      if (!del) throw new ApolloError("server_error", "error_deleting_company");
      return del;
    },
  },
};
module.exports = resolvers;
