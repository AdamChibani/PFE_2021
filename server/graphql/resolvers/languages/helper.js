const { ApolloError } = require("apollo-server-errors");
const {
  Language,
  Profile,
  ProfileLanguage,
} = require("../../../database/models");

const languageHelpers = {
  async getAll() {
    return await Language.findAll();
  },
  async getByConsultant(id) {
    const x = await Profile.findByPk({
      where: id,
      include: [
        { model: Language, as: "languages", through: "profile_languages" },
      ],
    });
    console.log(x.languages);
    return x.languages;
  },
  async getOne(id) {
    return await Language.findByPk(id);
  },
  async create(input) {
    console.log({ input });
    const s = await Language.create(input).catch((e) => {
      console.log("Language creation error : ", e);
      return false;
    });
    console.log(s);
    return s.dataValues;
  },
  async update(args) {
    console.log(args);
    const s = await Language.findByPk(args.id);
    if (!s) {
      throw new ApolloError(
        "server_error",
        "error_updating_language!_language_does_not_exist"
      );
    }
    return await s
      .update(args)
      .then(() => {
        return s;
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
        const s = await Language.findByPk(args.id);
        if (!s) {
          throw new ApolloError(
            "server_error",
            "error_updating_language!_language_does_not_exist"
          );
        }
        await s
          .update({
            id: args.id,
            language: args.language,
            read: args.read,
            write: args.write,
            speak: args.speak,
            comprehend: args.comprehend,
            profile_id: pId,
          })
          .then(() => {
            return s;
          })
          .catch((error) => {
            console.log(error);
            throw new ApolloError(
              "server_error",
              "error_updating_language!_error_in_the_backend"
            );
          });
      } else {
        const r = await this.create({
          language: args.language,
          read: args.read,
          write: args.write,
          speak: args.speak,
          comprehend: args.comprehend,
          profile_id: pId,
        });
        console.log({ r });
      }
    });
    return b;
  },
  async delete(id) {
    return await Language.destroy({
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
  async setLanguage(id, user) {
    const args = {};
    args.languageId = id;
    const profileId = await Profile.findOne({ where: { user_id: user.id } });
    args.profileId = profileId.id;
    console.log(args);
    const s = await ProfileLanguage.create(args).catch((e) => {
      console.log("Language Profile link creation error : ", e);
      return false;
    });

    return !(s === false);
  },
};
module.exports = languageHelpers;
