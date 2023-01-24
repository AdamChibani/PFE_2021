const { ApolloError } = require("apollo-server-errors");
const { Field, Profile, ProfileField } = require("../../../database/models");

const fieldHelpers = {
  async getAll() {
    return await Field.findAll();
  },
  async getByConsultant(consultantId) {
    const x = await Profile.findAll({
      where: { id: consultantId },
      include: [{ model: Field, as: "fields", through: "profile_fields" }],
    });
    return x[0].fields;
  },
  async getOne(id) {
    console.log(id);
    console.log(await Field.findByPk(id));
    return await Field.findByPk(id);
  },
  async create(args) {
    const s = await Field.create(args).catch((e) => {
      console.log("Field creation error : ", e);
      return false;
    });
    console.log(s);
    return s.dataValues;
  },
  async update(args) {
    if (args.id) {
      const s = await Field.findByPk(args.id);
      if (!s) {
        throw new ApolloError(
          "server_error",
          "error_updating_field!_field_does_not_exist"
        );
      }
      return await s
        .update(args)
        .then(() => {
          return s;
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      const r = await this.create(args);
      this.setField(r.id, args.pId);
      return r;
    }
  },
  async updateAll(vars, pId) {
    let b = true;
    b = await vars.input.forEach(async (args, i) => {
      if (args.id) {
        const s = await Field.findByPk(args.id);
        if (!s) {
          throw new ApolloError(
            "server_error",
            "error_updating_field!_field_does_not_exist"
          );
        }
        await s
          .update({
            id: args.id,
            name: args.name,
            specialty: args.specialty,
          })
          .then(() => {
            return s;
          })
          .catch((error) => {
            console.log(error);
            throw new ApolloError(
              "server_error",
              "error_updating_field!_error_in_the_backend"
            );
          });
      } else {
        const r = await this.create({
          name: args.name,
          specialty: args.specialty,
        });
        this.setField(r.id, pId);
      }
    });
    return Boolean(b);
  },
  async delete(id) {
    const f = await Field.findByPk(id);
    if (!f) {
      return false;
    } else
      return await Field.destroy({
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
  async setField(id, user) {
    console.log(user);
    const args = {};
    args.fieldId = id;
    const profileId = await Profile.findOne({ where: { id: user } });
    args.profileId = profileId.id;
    console.log(args);
    const s = await ProfileField.create(args).catch((e) => {
      console.log("Field Profile link creation error : ", e);
      return false;
    });
    console.log(s);
    return true;
  },
};
module.exports = fieldHelpers;
