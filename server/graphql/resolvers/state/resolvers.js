const stateHelpers = require("./helper");

const resolvers = {
  Query: {
    async getAllStates() {
      return await stateHelpers.getAll();
    },
    async getSingleState(_, id) {
      return await stateHelpers.getOne(id.stateId);
    },
  },
  Mutation: {
    async createState(_, { name, developer }) {
      console.log(name);
      return await stateHelpers.create({ name, developer });
    },
    async updateState(_, { id, name, developer }) {
      return await stateHelpers.update({ id, name, developer });
    },
    async deleteState(_, id) {
      return await stateHelpers.delete(id.id);
    },
  },
};
module.exports = resolvers;
