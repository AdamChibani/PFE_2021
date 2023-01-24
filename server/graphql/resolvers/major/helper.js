const { ApolloError } = require("apollo-server-errors");
const { Major, Education } = require("../../../database/models");
const majorHelpers = {
  async getAll() {
    return await Major.findAll();
  },
  async getByEducation(educationId) {
    const education = await Education.findOne({ where: { id: educationId } });
    console.log(education.major_id);
    return await Major.findByPk(education.major_id);
  },
  async getOne(id) {
    return await Major.findByPk(id);
  },
  async create(args, user) {
    if (!user) {
      throw new ApolloError(
        "server_error",
        "error_creating_major!_user_does_not_exist"
      );
    }

    const c = await Major.create(args).catch((e) => {
      console.log("Major creation error :", e);
      return false;
    });
    console.log(c);
    return c.dataValues;
  },
  async update(args) {
    const c = await Major.findByPk(args.id);
    if (!c) {
      throw new ApolloError(
        "server_error",
        "error_updating_major!_major_does_not_exist"
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
    return await Major.destroy({
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
module.exports = majorHelpers;
