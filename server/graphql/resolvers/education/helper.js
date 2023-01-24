const { ApolloError } = require("apollo-server-errors");
const {
  Education,
  Profile,
  Diploma,
  Major,
} = require("../../../database/models");
const graphqlHelper = require("../../helpers/graphql.helper");
const educationHelpers = {
  async getAll() {
    return await Education.findAll();
  },
  async getByConsultant(userId, requestedFields) {
    const attributes = new Set();
    for (const field in requestedFields) {
      if (Education.rawAttributes[field]) attributes.add(field);
    }

    const include = graphqlHelper.getIncludesFields(requestedFields);
    const profileId = await Profile.findOne({ where: { user_id: userId } });

    return await Education.findAll({
      where: { profile_id: profileId.id },
      include,
    });
  },
  async getOne(id, requestedFields) {
    const include = graphqlHelper.getIncludesFields(requestedFields);
    return await Education.findOne({ where: id, include });
  },
  async create(args, user) {
    console.log({ args });
    args.args.profile_id = user;
    const c = await Education.create(args.args).catch((e) => {
      console.log("Education creation error :", e);
      return false;
    });
    console.log(c);
    return c.dataValues;
  },
  async updateAll(vars, pId) {
    let b = true;
    await vars.input.forEach(async (args, i) => {
      console.log(args);

      if (args.id) {
        const s = await Education.findByPk(args.id);
        if (!s) {
          throw new ApolloError(
            "server_error",
            "error_updating_preference!_preference_does_not_exist"
          );
        }
        const d = await Diploma.findByPk(args.diploma.id);
        d.update(args.diploma);
        const m = await Major.findByPk(args.major.id);
        m.update(args.major);
        await this.update(args);
      } else {
        const d = await Diploma.create(args.diploma);
        const m = await Major.create(args.major);
        args.major_id = m.dataValues.id;
        args.diploma_id = d.dataValues.id;
        await this.create(
          {
            args,
          },
          pId
        );
      }
    });
    return b;
  },
  async update2(args) {
    console.log(args[0].id);
    const e = await Education.findByPk(args[0].id);
    console.log({ e: e.dataValues });
    const d = await Diploma.findByPk(e.dataValues.diploma_id);
    console.log({ d });
    const m = await Major.findByPk(e.dataValues.major_id);
    console.log({ m });
  },
  async update(args, requestedFields) {
    const include = graphqlHelper.getIncludesFields(requestedFields);

    const c = await Education.findOne({ where: { id: args.id }, include });
    if (!c) {
      throw new ApolloError(
        "server_error",
        "error_updating_education!_education_does_not_exist"
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
    return await Education.destroy({
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
module.exports = educationHelpers;
