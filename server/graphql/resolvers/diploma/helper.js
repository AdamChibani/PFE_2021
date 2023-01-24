const { ApolloError } = require("apollo-server-errors");
const { Diploma, Education } = require("../../../database/models");
const diplomaHelpers = {
  async getAll() {
    return await Diploma.findAll();
  },
  async getByEducation(educationId) {
    const education = await Education.findOne({ where: { id: educationId } });
    console.log(education.diploma_id);
    return await Diploma.findByPk(education.diploma_id);
  },
  async getOne(id) {
    return await Diploma.findByPk(id);
  },
  async create(args, user) {
    if (!user) {
      throw new ApolloError(
        "server_error",
        "error_creating_diploma!_user_does_not_exist"
      );
    }

    const c = await Diploma.create(args).catch((e) => {
      console.log("Diploma creation error :", e);
      return false;
    });
    console.log(c);
    return c.dataValues;
  },
  async update(args) {
    const c = await Diploma.findByPk(args.id);
    if (!c) {
      throw new ApolloError(
        "server_error",
        "error_updating_diploma!_diploma_does_not_exist"
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
    return await Diploma.destroy({
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
module.exports = diplomaHelpers;
