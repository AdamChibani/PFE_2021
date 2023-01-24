const { ApolloError } = require("apollo-server-errors");
const {
  Preference,
  Profile,
  ProfilePreference,
  Country,
  PreferenceCountry,
} = require("../../../database/models");

const preferenceHelpers = {
  async getAll() {
    return await Preference.findAll();
  },
  async getByConsultant(consultantId) {
    const x = await Profile.findOne({
      where: { user_id: consultantId },
    });
    console.log(x.id);
    const res = await ProfilePreference.findAll({
      where: { profile_id: x.id },
    });
    let tab = [];
    res.forEach((i) => {
      tab.push(i.preference_id);
    });
    const r = await Profile.findOne({
      where: { id: x.id },
      include: {
        model: Preference,
        as: "preferences",
        through: { ProfilePreference },
        raw: true,
        nest: true,
        include: {
          model: Country,
          as: "countries",
          through: { PreferenceCountry },
        },
      },
    });
    console.log(r.preferences);
    // await Preference.findAll({ where: { id: tab } })
    return r.preferences;
  },
  async getOne(id) {
    console.log(id);
    console.log(await Preference.findByPk(id));
    return await Preference.findByPk(id);
  },
  async create(args) {
    const s = await Preference.create(args).catch((e) => {
      console.log("Preference creation error : ", e);
      return false;
    });
    console.log(s);
    return s.dataValues;
  },
  async updateAll(vars, pId) {
    console.log({ vars });
    let b = true;
    await vars.input.forEach(async (args, i) => {
      console.log(args);

      if (args.id) {
        const s = await Preference.findByPk(args.id);
        if (!s) {
          throw new ApolloError(
            "server_error",
            "error_updating_preference!_preference_does_not_exist"
          );
        }
        await this.update(args);
      } else {
        const r = await this.create({
          name: args.name,
          status: args.status,
        }).then((r) => {
          console.log("object");
          console.log({ rId: r.id, pId });
          args.id = r.id;
          this.update(args);
          this.setPreference(r.id, pId);
        });
      }
    });
    return b;
  },
  async update(args) {
    await PreferenceCountry.destroy({
      where: { preference_id: args.id },
    });

    const tab = await args.countryId.map(async (c) => {
      return await PreferenceCountry.create({
        preference_id: args.id,
        country_id: c,
      });
    });
    const x = await Promise.all(tab);
    console.log({ x });
    console.log({ tab });
    if (x) {
      const s = await Preference.findByPk(args.id, {
        include: {
          model: Country,
          as: "countries",
          through: { PreferenceCountry },
        },
      });
      return await s
        .update(args)
        .then((val) => {
          console.log({ val: val.dataValues.countries[0].dataValues });
          return val.dataValues;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    }
    if (!s) {
      throw new ApolloError(
        "server_error",
        "error_updating_preference!_preference_does_not_exist"
      );
    }
  },
  async delete(id) {
    return await Preference.destroy({
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
  async setPreference(id, user) {
    const args = {};
    args.preference_id = id;
    args.profile_id = user;
    console.log(args);
    const s = await ProfilePreference.create(args).catch((e) => {
      console.log("Preference Profile link creation error : ", e);
      throw new ApolloError("Preference Profile link creation error : ", e);
    });
    console.log(s);
    return true;
  },
};
module.exports = preferenceHelpers;
