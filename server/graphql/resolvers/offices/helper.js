const { ApolloError } = require("apollo-server-errors");
const { Office, Address } = require("../../../database/models");
const graphqlHelper = require("../../helpers/graphql.helper");

const officeHelpers = {
  async getAll(id, requestedFields) {
    const include = graphqlHelper.getIncludesFields(requestedFields);

    return await Office.findAll({ where: { company_id: id }, include });
  },
  async updateAll(vars) {
    let b = true;
    b = await vars.input.forEach(async (args, i) => {
      console.log(args);
      if (args.id) {
        const s = await Office.findByPk(args.id);
        if (!s) {
          throw new ApolloError(
            "server_error",
            "error_updating_field!_field_does_not_exist"
          );
        }
        const a = await Address.findOne({
          where: { office_id: args.id },
        });
        await a
          .update({
            street: args.street,
            city: args.city,
            postalCode: args.postal_code,
            country_id: args.country_id,
          })
          .catch((error) => {
            throw new ApollogError(
              "server_error",
              "error_updating_fieldaddress"
            );
          });
        await s
          .update({
            name: args.name,
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
        const r = await Office.create({
          name: args.name,
          company_id: args.company_id,
        }).then(async (d) => {
          await Address.create({
            street: args.street,
            city: args.city,
            postalCode: args.postal_code,
            country_id: args.country_id,
            office_id: d.id,
          });
        });
      }
    });
    return Boolean(b);
  },
};
module.exports = officeHelpers;
