const { ApolloError } = require("apollo-server-errors");
const { Certification, Profile } = require("../../../database/models");
const certificationHelpers = {
  async getAll() {
    return await Certification.findAll();
  },
  async getByConsultant(userId) {
    const profileId = await Profile.findOne({ where: { user_id: userId } });

    return await Certification.findAll({ where: { profile_id: profileId.id } });
  },
  async getOne(id) {
    return await Certification.findByPk(id);
  },
  async create(args, user) {
    if (!user) {
      throw new ApolloError(
        "server_error",
        "error_creating_certification!_user_does_not_exist"
      );
    }

    args.profile_id = user;
    const c = await Certification.create(args).catch((e) => {
      console.log("Certification creation error :", e);
      return false;
    });
    console.log(c);
    return c.dataValues;
  },
  async update(args) {
    const c = await Certification.findByPk(args.id);
    if (!c) {
      throw new ApolloError(
        "server_error",
        "error_updating_certification!_certification_does_not_exist"
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
  async updateAll(vars, pId) {
    console.log({ vars });
    let b = true;
    await vars.input.forEach(async (args, i) => {
      if (args.id) {
        const s = await Certification.findByPk(args.id);
        if (!s) {
          throw new ApolloError(
            "server_error",
            "error_updating_certification!_certification_does_not_exist"
          );
        }
        await s
          .update({
            id: args.id,
            name: args.name,
            category: args.category,
            instution: args.instution,
            date: args.date,
            duration: args.duration,
            level: args.level,
            profile_id: pId,
          })
          .then(() => {
            return s;
          })
          .catch((error) => {
            console.log(error);
            throw new ApolloError(
              "server_error",
              "error_updating_certification!_error_in_the_backend"
            );
          });
      } else {
        await this.create(
          {
            name: args.name,
            category: args.category,
            instution: args.instution,
            date: args.date,
            duration: args.duration,
            level: args.level,
          },
          pId
        );
      }
    });
    return b;
  },
  async delete(id) {
    console.log(id);
    return await Certification.destroy({
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
module.exports = certificationHelpers;
