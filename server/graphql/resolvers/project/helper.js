const { ApolloError } = require("apollo-server-errors");
const { Project, Profile } = require("../../../database/models");
const projectHelpers = {
  async getAll() {
    return await Project.findAll();
  },
  async getByConsultant(userId) {
    const profileId = await Profile.findOne({ where: { user_id: userId } });

    return await Project.findAll({ where: { profile_id: profileId.id } });
  },
  async getOne(id) {
    return await Project.findByPk(id);
  },
  async create(args, user) {
    args.profile_id = user;
    const c = await Project.create(args).catch((e) => {
      console.log("Project creation error :", e);
      return false;
    });
    console.log(c);
    return c.dataValues;
  },
  async update(args) {
    const c = await Project.findByPk(args.id);
    if (!c) {
      throw new ApolloError(
        "server_error",
        "error_updating_project!_project_does_not_exist"
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
    return await Project.destroy({
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
  async updateAll(vars, pId) {
    console.log({ vars });
    let b = true;
    await vars.input.forEach(async (args, i) => {
      console.log(args);

      if (args.id) {
        const s = await Project.findByPk(args.id);
        if (!s) {
          throw new ApolloError(
            "server_error",
            "error_updating_work_project!_work_project_does_not_exist"
          );
        }
        await s
          .update({
            id: args.id,
            project_title: args.projectTitle,
            job_title: args.jobTitle,
            scope: args.scope,
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
              "error_updating_work_project!_error_in_the_backend"
            );
          });
      } else {
        const r = await this.create(
          {
            projectTitle: args.projectTitle,
            jobTitle: args.jobTitle,
            scope: args.scope,
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
};
module.exports = projectHelpers;
