const { Country, PreferenceCountry } = require("../../../database/models");
const { ApolloError } = require("apollo-server-errors");
const graphqlHelper = require("../../helpers/graphql.helper");

const countryHelpers = {
  async getAll(requestedFields) {
    const attributes = new Set();
    for (const field in requestedFields) {
      if (Country.rawAttributes[field]) attributes.add(field);
    }
    const include = graphqlHelper.getIncludesFields(requestedFields);
    return await Country.findAll({ include });
  },
  async getByName(name) {
    return await Country.findOne({ where: { name } });
  },
  async updateLink(args) {
    const x = await PreferenceCountry.findOne({
      where: { preference_id: args.preferenceId, country_id: args.countryId },
    });
    const y = await Country.findOne({
      where: { name: args.newCountry },
    });
    if (
      await PreferenceCountry.findOne({
        where: { preference_id: args.preferenceId, country_id: y.id },
      })
    ) {
      throw new ApolloError(
        "server_error",
        "error_updating_country!_country_already_exists"
      );
    }
    return await x
      .update({ country_id: y.id })
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  },
};

module.exports = countryHelpers;
