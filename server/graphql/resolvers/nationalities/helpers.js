const { Nationality } = require("../../../database/models");
const nationalityHelpers = {
  async getAll() {
    return await Nationality.findAll();
  },
};
module.exports = nationalityHelpers;
