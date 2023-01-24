const skillHelpers = require("./helper");

const resolvers = {
  Query: {
    async getAllSkills() {
      return await skillHelpers.getAll();
    },
    async getSingleSkill(_, id) {
      return await skillHelpers.getOne(id.skillId);
    },
    async getAllSkillsByConsultant(_, args) {
      console.log(args.consultantId);
      return await skillHelpers.getByConsultant(args.consultantId);
    },
  },
  Mutation: {
    async createSkill(_, { name, developer }) {
      console.log(name);
      return await skillHelpers.create({ name, developer });
    },
    async updateSkill(_, { id, name, developer }) {
      return await skillHelpers.update({ id, name, developer });
    },
    async updateSkills(_, { input, pId }) {
      console.log({ input });
      return await skillHelpers.updateAll(
        {
          input,
        },
        pId
      );
    },
    async deleteSkill(_, id) {
      return await skillHelpers.delete(id.id);
    },
    async setSkillToUser(_, { id }, { user }) {
      return await skillHelpers.setSkill(id, user);
    },
  },
};
module.exports = resolvers;
