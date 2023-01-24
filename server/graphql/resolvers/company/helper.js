const { ApolloError } = require("apollo-server-errors");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;
const { User, Company } = require("../../../database/models");
const graphqlHelper = require("../../helpers/graphql.helper");

const companyHelpers = {
  async getAll(requestedFields) {
    const include = graphqlHelper.getIncludesFields(requestedFields);
    return await Company.findAll({ include });
  },
  async getAgencies(requestedFields) {
    const include = graphqlHelper.getIncludesFields(requestedFields);
    return await Company.findAll({ include, where: { isAgency: true } });
  },
  async getEnterprises(requestedFields) {
    const include = graphqlHelper.getIncludesFields(requestedFields);
    return await Company.findAll({ include, where: { isAgency: false } });
  },
  async create(args) {
    p = await Company.create(args).catch((e) => {
      console.log("Company creation error : ", e);
      return false;
    });
    const us = await User.findByPk(args.userId);
    await us.update({ company_id: p.dataValues.id, role_id: 3 });
    return p.dataValues;
  },
  async create2(args) {
    args.isAgency = 0;
    console.log(args);
    p = await Company.create(args).catch((e) => {
      console.log("Company creation error : ", e);
      return false;
    });
    const us = await User.findByPk(args.userId);
    await us.update({ company_id: p.dataValues.id, role_id: 2 });
    return p.dataValues;
  },
  async getConsult(id, requestedFields) {
    const include = graphqlHelper.getIncludesFields(requestedFields);

    return await User.findAll({
      where: { role_id: 1, company_id: id },
      include,
    });
  },
  async getWorkers(id, profile, requestedFields) {
    const include = graphqlHelper.getIncludesFields(requestedFields);

    return await User.findAll({
      where: { company_id: id, [Op.not]: [{ id: profile }] },
      include,
    });
  },
  async getCompByadmin(id, requestedFields) {
    const include = graphqlHelper.getIncludesFields(requestedFields);

    const p = await User.findByPk(id);
    console.log(p.id);
    console.log(include);
    const r = await Company.findOne({ where: { id: p.company_id }, include });
    console.log(r);
    return r;
  },
  async update(args) {
    const company = await Company.findOne({ where: { id: args.id } });
    if (!company) {
      throw new ApolloError(
        "server_error",
        "error_updating_company_user_does_not_exist"
      );
    }
    return await company
      .update(args)
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  },
  async delete(companyId) {
    return await Company.destroy({
      where: {
        id: companyId,
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
module.exports = companyHelpers;
