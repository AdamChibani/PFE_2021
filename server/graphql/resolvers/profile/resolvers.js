const { ApolloError } = require("apollo-server-errors");
const profileHelpers = require("./helper");
const { Profile } = require("../../../database/models");
const { requestedFields } = require("../../helpers/graphql.helper");

const resolvers = {
  Query: {
    async getAllProfiles(_, __, ___, info) {
      const atr = requestedFields(info);
      return await profileHelpers.getAll(atr);
    },
    async getByFilter(_, { input }, __, info) {
      const atr = requestedFields(info);
      return await profileHelpers.getFiltered(input, atr);
    },
    async getSingleProfile(_, { id }, __, info) {
      const atr = requestedFields(info);
      return await profileHelpers.getOne(id, atr);
    },
    async getAllConsultants(_, __, ___, info) {
      const atr = requestedFields(info);
      return await profileHelpers.getConsultants(atr);
    },
    async getMyProfile(_, { id }, { user }, info) {
      const attributes = requestedFields(info);
      const res = await profileHelpers.getMine(id, attributes);
      if (res) return res;
      return null;
    },
  },
  Mutation: {
    async createEnterpriseAdminProfile(_, { input }, { user }) {
      const pID = await profileHelpers.create(input, user);
      if (!pID) throw new ApolloError("server_error", "error_creating_profile");
      return pID;
    },
    async createAgencyAdminProfile(_, { input }, { user }) {
      input.isAgencyAdmin = true;
      const pID = await profileHelpers.create(input, user);
      if (!pID) throw new ApolloError("server_error", "error_creating_profile");
      return pID;
    },
    async createConsultantProfile(_, { input }) {
      const pID = await profileHelpers.create(input);
      if (!pID) throw new ApolloError("server_error", "error_creating_profile");
      return pID;
    },
    async updateConsultantProfile(_, { input }, __, info) {
      const attributes = requestedFields(info);

      const upd = await profileHelpers.update(input, attributes);
      if (!upd) throw new ApolloError("server_error", "error_updating_profile");
      return upd;
    },
    async updateAdminProfile(_, { input }, { user }) {
      const upd = await profileHelpers.update(input, user);
      if (!upd) throw new ApolloError("server_error", "error_updating_profile");
      return upd;
    },

    async deleteProfile(_, __, { user }) {
      const p = await Profile.findOne({ where: { user_id: user.id } });
      if (!p) {
        throw new ApolloError(
          "server_error",
          "error_updating_profile_user_does_not_exist"
        );
      }
      const del = await profileHelpers.delete(p.id);
      if (!del) throw new ApolloError("server_error", "error_deleting_profile");
    },
    async assignDismissAgencyAdmin(_, { userId }) {
      const args = {};
      const profile = await Profile.findOne({ where: { user_id: userId } });
      if (!profile) {
        throw new ApolloError(
          "server_error",
          "error_updating_profile_user_does_not_exist"
        );
      }
      args.isAgencyAdmin = !profile.isAgencyAdmin;

      return await profile
        .update(args)
        .then(() => {
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    },
    async getPDF(_, { id }, __, info) {
      const attributes = requestedFields(info);
      return await profileHelpers.exportCv(id, attributes);
    },
    async addClick(_, { id }) {
      return await profileHelpers.addVisit(id);
    },
    async inceremntState(_, { id, val }) {
      return await profileHelpers.increment(id, val);
    },
  },
};
module.exports = resolvers;
