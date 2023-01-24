const fieldHelpers = require("./helper");

const resolvers = {
  Query: {
    async getAllFields() {
      return await fieldHelpers.getAll();
    },
    async getSingleField(_, id) {
      return await fieldHelpers.getOne(id.id);
    },
    async getAllFieldsByConsultant(_, args) {
      console.log(args.consultantId);
      return await fieldHelpers.getByConsultant(args.consultantId);
    },
  },
  Mutation: {
    async createField(_, { name, specialty }) {
      console.log(name);
      return await fieldHelpers.create({ name, specialty });
    },
    async updateField(_, { id, name, specialty, pId }) {
      console.log({ pId });
      return await fieldHelpers.update({ id, name, specialty, pId });
    },
    async updateFields(_, { input, pId }) {
      console.log({ input });
      return await fieldHelpers.updateAll(
        {
          input,
        },
        pId
      );
    },
    async deleteField(_, id) {
      return await fieldHelpers.delete(id.id);
    },
    async setFieldToUser(_, { id, pId }) {
      return await fieldHelpers.setField(id, pId);
    },
  },
};
module.exports = resolvers;
