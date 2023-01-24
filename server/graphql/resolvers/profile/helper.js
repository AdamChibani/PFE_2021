const { ApolloError } = require("apollo-server-errors");
const Sequelize = require("sequelize");
const pdfTemplate = require("../../documents");
const path = require("path");
const Handlebars = require("handlebars");
const HTML5ToPDF = require("html5-to-pdf");
const fs = require("fs");
const Op = Sequelize.Op;
const {
  Field,
  Profile,
  Preference,
  Country,
  Education,
  Diploma,
  sequelize,
} = require("../../../database/models");
const graphqlHelper = require("../../helpers/graphql.helper");

const profileHelpers = {
  async getAll(requestedFields) {
    const attributes = new Set();
    for (const field in requestedFields) {
      if (Profile.rawAttributes[field]) attributes.add(field);
    }
    const include = graphqlHelper.getIncludesFields(requestedFields);
    const r = await Profile.findAll(include);
    return r;
  },
  async getFiltered(args, requestedFields) {
    console.log({ args });
    let include = graphqlHelper.getIncludesFields(requestedFields);
    const inc = include;
    let r;
    r = await Profile.findAll({ include, attributes: ["id"] });
    if (args.jobType)
      include = [
        ...include,
        {
          model: Preference,
          as: "preferences",
          through: "profile_preferences",
          required: true,
          where: { name: args.jobType },
        },
      ];
    if (args.diploma)
      include = [
        ...include,
        {
          model: Education,
          as: "educations",
          required: true,
          include: {
            model: Diploma,
            as: "diplomas",
            required: true,
            where: { diploma: args.diploma },
          },
        },
      ];
    if (args.field)
      include = [
        ...include,
        {
          model: Field,
          as: "fields",
          through: "profile_field",
          required: true,
          where: { name: { [Op.like]: "%" + args.field + "%" } },
        },
      ];
    // console.log(include);
    if (args.country)
      include = [
        ...include,
        {
          model: Preference,
          as: "preferences",
          through: "profile_preferences",
          required: true,
          include: {
            model: Country,
            as: "countries",
            through: "preference_countries",
            where: { id: args.country },
            required: true,
          },
        },
      ];
    if (args.hourRate)
      r = await Profile.findAll({
        include,
        attributes: ["id"],
        where: { hourRate: { [Op.between]: args.hourRate } },
      });
    if (args.years) {
      console.log(args.years[0]);
      if (!args.years[0] != ["15+"]) {
        console.log(args.years[0]);
        r = await Profile.findAll({
          include,
          attributes: ["id"],
          where: { years: { [Op.between]: args.years[0] } },
        });
      } else
        r = await Profile.findAll({
          include,
          attributes: ["id"],
          where: { years: { [Op.gt]: 15 } },
        });
    }
    let ids = [];
    r.forEach((p) => {
      ids.push(p.dataValues.id);
    });
    return await Profile.findAll({
      include: inc,
      where: { id: ids, state: 0 },
    });
  },
  async getMine(id, requestedFields) {
    const attributes = new Set();
    for (const field in requestedFields) {
      if (Profile.rawAttributes[field]) attributes.add(field);
    }
    const include = graphqlHelper.getIncludesFields(requestedFields);
    // if (!user) {
    //   throw new ApolloError(
    //     "server_error",
    //     "error_getting_profile!_not_authenticated"
    //   );
    // }

    return await Profile.findOne({
      where: { user_id: id },
      include,
    });
  },
  async getOne(id, requestedFields) {
    const attributes = new Set();
    for (const field in requestedFields) {
      if (Profile.rawAttributes[field]) attributes.add(field);
    }
    const include = graphqlHelper.getIncludesFields(requestedFields);
    console.log({ include });
    const res = await Profile.findOne({ where: id, include });
    return res;
  },
  async getConsultants(requestedFields) {
    const attributes = new Set();
    for (const field in requestedFields) {
      if (Profile.rawAttributes[field]) attributes.add(field);
    }
    const include = graphqlHelper.getIncludesFields(requestedFields);
    console.log({ include });

    return await Profile.findAll({
      where: { hourRate: { [Op.ne]: null } },
      include,
    });
  },
  async create(args) {
    if (!args.userId) {
      throw new ApolloError(
        "server_error",
        "error_creating_profile!_user_does_not_exist"
      );
    }
    args.user_id = args.userId;
    const use = await Profile.findOne({ where: { user_id: args.userId } });
    var p = {};
    if (use) {
      throw new ApolloError(
        "server_error",
        "error_creating_profile_user_exists"
      );
    }
    p = await Profile.create(args).catch((e) => {
      console.log("Profile creation error : ", e);
      return false;
    });
    return p.dataValues;
  },
  async update(args, requestedFields) {
    const include = graphqlHelper.getIncludesFields(requestedFields);
    console.log({ args });
    const profile = await Profile.findOne({ where: { id: args.id } });
    if (!profile) {
      throw new ApolloError(
        "server_error",
        "error_updating_profile_user_does_not_exist"
      );
    }
    console.log(profile);
    await profile
      .update(args)

      .catch((error) => {
        console.log(error);
        throw new ApolloError("error", "error_updating_profile");
      });
    return await Profile.findOne({ where: { id: args.id }, include });
  },
  async delete(profileId) {
    return await Profile.destroy({
      where: {
        id: profileId,
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
  async exportCv(profileId, requestedFields) {
    const include = graphqlHelper.getIncludesFields(requestedFields);

    const profile = await Profile.findOne({
      where: { id: profileId },
      include,
    });
    const hbsTemplate = fs.readFileSync(
      path.join(process.cwd(), "graphql/documents", "index.handlebars"),
      "utf8"
    );
    const template = Handlebars.compile(hbsTemplate);

    const html5ToPDF = new HTML5ToPDF({
      inputBody: template(profile.dataValues),
      pdf: { format: "A4" },
      launchOptions: {
        executablePath: process.env.CHROME_BIN,
        args: ["--no-sandbox", "--headless", "--disable-gpu"],
      },
    });
    await html5ToPDF.start();
    const buffer = await html5ToPDF.build();
    await html5ToPDF.close();
    return buffer.toString("base64");
  },
  async addVisit(id) {
    return await Profile.update(
      { clicks: sequelize.literal("clicks + 1") },
      { where: { id } }
    );
  },
  async increment(id, val) {
    return await Profile.update({ state: val }, { where: { id } });
  },
};
module.exports = profileHelpers;
