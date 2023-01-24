const { ApolloError } = require("apollo-server-errors");
const { Skill, Profile, ProfileSkill } = require("../../../database/models");
const skillHelpers = {
  async getAll() {
    return await Skill.findAll();
  },
  async getByConsultant(consultantId) {
    const x = await Profile.findAll({
      where: { id: consultantId },
      include: [{ model: Skill, as: "skills", through: "profile_skills" }],
    });
    console.log(x[0].skills);
    return x[0].skills;
  },
  async getOne(id) {
    console.log(id);
    console.log(await Skill.findByPk(id));
    return await Skill.findByPk(id);
  },
  async create(args) {
    const s = await Skill.create(args).catch((e) => {
      console.log("Skill creation error : ", e);
      return false;
    });
    console.log(s);
    return s.dataValues;
  },
  async update(args) {
    const s = await Skill.findByPk(args.id);
    if (!s) {
      throw new ApolloError(
        "server_error",
        "error_updating_skill!_skill_does_not_exist"
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
  async updateAll(vars, pId) {
    console.log({ vars });
    let b = true;
    await vars.input.forEach(async (args, i) => {
      console.log(args);

      if (args.id) {
        const s = await Skill.findByPk(args.id);
        if (!s) {
          throw new ApolloError(
            "server_error",
            "error_updating_skill!_skill_does_not_exist"
          );
        }
        await s
          .update({
            id: args.id,
            name: args.name,
            developer: args.developer,
          })
          .then(() => {
            return s;
          })
          .catch((error) => {
            console.log(error);
            throw new ApolloError(
              "server_error",
              "error_updating_skill!_error_in_the_backend"
            );
          });
      } else {
        const r = await this.create({
          name: args.name,
          developer: args.developer,
        });
        console.log({ r });
        console.log("object");
        console.log({ rId: r.id, pId });
        this.setSkill(r.id, pId);
      }
    });
    return b;
  },
  async delete(id) {
    return await Skill.destroy({
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
  async setSkill(id, user) {
    const args = {};
    args.skillId = id;

    args.profileId = user;
    const s = await ProfileSkill.create(args).catch((e) => {
      console.log("Skill Profile link creation error : ", e);
      return false;
    });
    console.log(s);
    return true;
  },
};
module.exports = skillHelpers;
