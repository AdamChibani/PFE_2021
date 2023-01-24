const { ApolloError } = require("apollo-server-errors");
const { State, Profile, ProfileState } = require("../../../database/models");
const stateHelpers = {
  async getAll() {
    return await State.findAll();
  },

  async getOne(id) {
    return await State.findByPk(id);
  },
  async create(args) {
    const s = await State.create(args).catch((e) => {
      console.log("State creation error : ", e);
      return false;
    });
    console.log(s);
    return s.dataValues;
  },
  async update(args) {
    const s = await State.findByPk(args.id);
    if (!s) {
      throw new ApolloError(
        "server_error",
        "error_updating_state!_state_does_not_exist"
      );
    }
    return await s
      .update(args)
      .then(() => {
        return s;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  },
  async delete(id) {
    return await State.destroy({
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
module.exports = stateHelpers;
