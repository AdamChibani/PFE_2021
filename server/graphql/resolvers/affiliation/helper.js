const { ApolloError } = require("apollo-server-errors");
const { Affiliation, Profile } = require("../../../database/models");
const affiliationHelpers = {
  async getAll() {
    return await Affiliation.findAll();
  },
  async getByConsultant(userId) {
    const profileId = await Profile.findOne({ where: { user_id: userId } });

    return await Affiliation.findAll({ where: { profile_id: profileId.id } });
  },
  async getOne(id) {
    return await Affiliation.findByPk(id);
  },
  async create(args, user) {
    if (!user) {
      throw new ApolloError(
        "server_error",
        "error_creating_affiliation!_user_does_not_exist"
      );
    }
    const profileId = await Profile.findOne({ where: { user_id: user.id } });
    args.profile_id = profileId.id;
    const c = await Affiliation.create(args).catch((e) => {
      console.log("Affiliation creation error :", e);
      return false;
    });
    console.log(c);
    return c.dataValues;
  },
  async update(args) {
    const c = await Affiliation.findByPk(args.id);
    if (!c) {
      throw new ApolloError(
        "server_error",
        "error_updating_affiliation!_affiliation_does_not_exist"
      );
    }
    return await c
      .update(args)
      .then(() => {
        return c.dataValues;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  },
  async delete(id) {
    console.log(id);
    return await Affiliation.destroy({
      where: {
        id,
      },
    })
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  },
};
module.exports = affiliationHelpers;
