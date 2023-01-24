const { ApolloError } = require("apollo-server-errors");
const { Experience, Profile } = require("../../../database/models");
const experienceHelpers = {
  async getAll() {
    return await Experience.findAll();
  },
  async getByConsultant(userId) {
    const profileId = await Profile.findOne({ where: { user_id: userId } });

    return await Experience.findAll({ where: { profile_id: profileId.id } });
  },
  async getOne(id) {
    return await Experience.findByPk(id);
  },
  async create(args, pId) {
    args.profile_id = pId;
    const c = await Experience.create(args).catch((e) => {
      console.log("Experience creation error :", e);
      return false;
    });
    console.log(c);
    return c.dataValues;
  },
  async update(args) {
    const c = await Experience.findByPk(args.id);
    if (!c) {
      throw new ApolloError(
        "server_error",
        "error_updating_experience!_experience_does_not_exist"
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
      console.log(args);

      if (args.id) {
        const s = await Experience.findByPk(args.id);
        if (!s) {
          throw new ApolloError(
            "server_error",
            "error_updating_work_experience!_work_experience_does_not_exist"
          );
        }
        await s
          .update({
            id: args.id,
            job_title: args.jobTitle,
            description: args.description,
            start_date: args.startDate,
            end_date: args.endDate,
            employer: args.employer,
            company: args.company,
            po_first_name: args.poFirstName,
            po_last_name: args.poLastName,
            po_email: args.poEmail,
            po_phone_number: args.poPhoneNumber,
            po_position: args.poPosition,
            profile_id: pId,
          })
          .then(() => {
            return s;
          })
          .catch((error) => {
            console.log(error);
            throw new ApolloError(
              "server_error",
              "error_updating_work_experience!_error_in_the_backend"
            );
          });
      } else {
        const r = await this.create(
          {
            jobTitle: args.jobTitle,
            description: args.description,
            startDate: args.startDate,
            endDate: args.endDate,
            employer: args.employer,
            company: args.company,
            poFirstName: args.poFirstName,
            poLastName: args.poLastName,
            poEmail: args.poEmail,
            poPhoneNumber: args.poPhoneNumber,
            poPosition: args.poPosition,
          },
          pId
        );
      }
    });
    return b;
  },
  async delete(id) {
    console.log(id);
    return await Experience.destroy({
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
module.exports = experienceHelpers;
