const { ApolloError } = require("apollo-server-express");
const { ApolloServer } = require("apollo-server-express");
const jsonwebtoken = require("jsonwebtoken");
const utlsHlprs = require("../../helpers/utils.helper");
const mailHelper = require("../../helpers/email.helper");
const i18nHelper = require("../../helpers/i18n.helper");
const { requestedFields } = require("../../helpers/graphql.helper");
const userHelpers = require("./helper");
const graphqlFields = require("graphql-fields");
const config = require("../../../database/config/config");
const resolvers = {
  Upload: ApolloServer.GraphQLUpload,

  Query: {
    async myProfile(_, { id }, __, information) {
      const requestedAttr = requestedFields(information);
      return await userHelpers.getMyProfile(id, requestedAttr);
    },
    async getAllEnterpriseAdmins(_, __, ___, information) {
      const requestedAttr = requestedFields(information);
      return userHelpers.getEnterpriseAdmin(requestedAttr);
    },
    // fetch the profile of currently authenticated user
    async me(_, args, { user, ip }, information) {
      // Get the user
      const requestedAttr = requestedFields(information);
      const attributes = {
        id: null,
        active: null,
        ...(requestedAttr.user || {}),
      };
      const users = await userHelpers.getAll(
        [{ name: "id", value: user.id }],
        attributes
      );
      const loggedUser = users[0];

      if (!loggedUser) {
        const error = user ? "NOT_AUTHENTICATED" : "BAD_USER_PASSWORD";
        throw new ApolloError(i18nHelper.__(error), error);
      }

      // Get the user if active
      if (!loggedUser.active) {
        const error = "USER_DEACTIVATED";
        throw new ApolloError(i18nHelper.__(error), error);
      }

      userHelpers.handleLoginDB(loggedUser.id, ip);

      return loggedUser;
    },

    async getUserById(_, args, { user }, info) {
      // make sure user is logged in
      if (!user) {
        const error = "NOT_AUTHENTICATED";
        throw new ApolloError(error, error);
      }

      // Autorisation
      // const access = await userHelpers.hasAccess("users", "can_view", user.id);
      // if (!access) {
      //   throw new ApolloError("GRANT_ERROR", "GRANT_ERROR");
      // }

      // Get user the returns it
      const requestedFiels = Object.keys(graphqlFields(info) || {} || {});
      const data = await userHelpers.getUserById(args.id, requestedFiels);

      return data;
    },

    // Get users by ids
    async users(_, { conditions }, { user }, information) {
      // make sure user is logged in
      if (!user) {
        const error = "NOT_AUTHENTICATED";
        throw new ApolloError(i18nHelper.__(error), error);
      }

      // Autorisation
      const access = await userHelpers.hasAccess("users", "can_view", user.id);
      if (!access) {
        throw new ApolloError(i18nHelper.__("GRANT_ERROR"), "GRANT_ERROR");
      }

      // Get user the returns it
      const attributes = requestedFields(information);
      return await userHelpers.getAll(conditions, attributes);
    },
  },

  Mutation: {
    async deleteUser(_, { userID }) {
      return await userHelpers.delete(userID);
    },
    /**
     * Sign-up a user
     * @author Mohamed Kharrat - Tekru Technologies
     * @param {*} _
     * @param {*} args
     */
    async signup(_, { data }, { ip }) {
      // Check for bad request
      const keys = Object.keys(data);
      const unallowedAttrbs = ["id", "active", "admin"];
      const badRequest = !!keys.find((key) => unallowedAttrbs.includes(key));
      if (badRequest) throw new ApolloError("BAD_REQUEST");
      // await signUp.validateAsync(data, { abortEarly: false });

      // Check for email
      const users = await userHelpers.getAll(
        [{ name: "email", value: data.email }],
        { id: null }
      );

      if (users.length > 0) throw new ApolloError("email_exists");

      // Store input
      const uID = await userHelpers.create(data);
      if (!uID) throw new ApolloError("server_error", "error_creating_user");

      // Verify email server
      // const mailTransporter = await mailHelper.createTransport();
      // const verify = await mailTransporter.verify();
      // if (!verify) throw new ApolloError("MAIL_SERVER_ERROR");

      // // Get input
      const [from, userSubject] = await Promise.all([
        mailHelper.getNoReplyEmail(),
        mailHelper.renderEmailSubject("user_signup_request_subject"),
      ]);
      const userEmailTo = `${data.firstName} ${data.lastName} <${data.email}>`;

      // // Notify user
      // const userOptions = {
      //   from: "chibani.adam99@gmail.com",
      //   to: userEmailTo,
      //   subject: userSubject,
      //   template: "user_signup_request",
      //   context: {
      //     name: input.firstName,
      //   },
      // };
      // const sendMail = async (options) => {
      //   try {
      //     const info = await mailTransporter.sendMail(options);
      //     const nodemailer = require("nodemailer");
      //     console.log({
      //       ...info,
      //       url: "Preview URL: " + nodemailer.getTestMessageUrl(info),
      //     });
      //     return true;
      //   } catch (error) {
      //     console.log({ error });
      //   }
      // };

      // Promise.all(sendMail(userOptions));

      return uID;
    },

    /**
     * Login function
     * Uses token or Email and Password
     * @author Mohamed Kharrat - Tekru Technologies
     * @param {*} _
     * @param {*} args Function arguments
     * @param {*} param2
     */
    async login(_, { input }, { user }, information) {
      const requestedAttr = requestedFields(information);
      // Get the user ID
      let uID = null;
      if (!user) {
        uID = await userHelpers.verifyEmailPassword(
          input.email,
          input.password
        );
      } else if (user && user.id) {
        uID = user.id;
      }
      if (!uID) {
        console.log(uID);
        const error = user ? "NOT_AUTHENTICATED" : "BAD_USER_PASSWORD";
        const err = new ApolloError(error, error);
        console.log({ err });
        throw err;
      }

      // Get the user
      const attributes = {
        id: null,
        active: null,
        ...(requestedAttr.user || {}),
      };

      const users = await userHelpers.getAll(
        [{ name: "id", value: uID }],
        attributes
      );
      const loggedUser = users[0];

      if (!loggedUser) {
        const error = user ? "NOT_AUTHENTICATED" : "BAD_USER_PASSWORD";
        throw new ApolloError(
          // i18nHelper.__(error),
          error
        );
      }

      // Get the user if active
      if (!loggedUser.active) {
        const error = "USER_DEACTIVATED";
        // throw new ApolloError(
        //   i18nHelper.__(error),
        //   error
        // );
      }

      // Get session duration
      // const sessionDuration = await utlsHlprs.getOption("token_life")

      // Generate the Json Web Token
      const token = jsonwebtoken.sign(
        {
          id: loggedUser.id,
          email: loggedUser.email,
        },
        "mySecret",
        {
          expiresIn: "365d",
        }
      );
      // Save user login data
      //userHelpers.handleLoginDB(loggedUser.id, ip);
      console.log({ user: loggedUser });
      return {
        token,
        user: loggedUser,
      };
    },

    async user(_, { data }, { user }) {
      if (!user) return;
      const email = data.email || null;
      let emailExist = null;
      if (data.id) {
        emailExist = await userHelpers.checkIfEmailExists(email, data.id);
        return await userHelpers.update(data);
      }
      emailExist = await userHelpers.checkIfEmailExists(email);
      if (checkIfEmailExists)
        throw new ApolloError("INPUT_ERRO_EMAIL_ALREADY_IN_USE");
      return await userHelpers.create(data);
    },

    // Forget the password handler
    async forgetPassword(_, { email }) {
      // Verify email server
      const mailTransporter = await mailHelper.createTransport();
      if (!(await mailTransporter.verify())) {
        throw new ApolloError(
          i18nHelper.__("MAIL_SERVER_ERROR"),
          "MAIL_SERVER_ERROR"
        );
      }

      // TODO (Security) add an IP and User Agent verification
      const user = await userHelpers.getForgetPasswordToken(email);

      if (!user) {
        // Check if user exists
        throw new ApolloError(i18nHelper.__("NO_USER_FOUND"), "NO_USER_FOUND");
      }

      const resetlink = utlsHlprs.fromUrl(
        "auth/reset-password/" + user.newPassKey
      );

      return await Promise.all([
        mailHelper.getNoReplyEmail(),
        userHelpers.getUserEmailAddressWithName(user.id),
        mailHelper.renderEmailSubject("PWD_FORGET_SUBJECT"),
      ])
        .then(async (values) => {
          const [from, to, subject] = values;
          // Get the email node modules
          const options = {
            from,
            to,
            subject,
            template: "forgetpassword",
            context: {
              name: user.firstName,
              resetlink,
            },
          };
          try {
            const info = await mailTransporter.sendMail(options);
            const nodemailer = require("nodemailer");
            console.log({
              ...info,
              url: "Preview URL: " + nodemailer.getTestMessageUrl(info),
            });
            return true;
          } catch (error) {
            console.log({ error });
            throw new ApolloError("SERVER_ERROR");
          }
        })
        .catch((error) => {
          console.log({ error });
          throw new ApolloError("SERVER_ERROR");
        });
    },
    async updateUser(_, { input }) {
      return await userHelpers.updateUse(input);
    },
    async resetPassword(_, { token, newpassword }) {
      // Check if token exists and not used
      const uID = await userHelpers.getUserByNewPassKey(token);
      if (uID <= 0) {
        const error = uID === -1 ? "token_expired" : "token_error";
        throw new ApolloError(error);
      }

      // Update the password
      const user = await userHelpers.setNewPassword(newpassword, uID);
      if (!user) throw new ApolloError("SERVER_ERROR");

      // Get mail transport
      const mailTransporter = await mailHelper.createTransport();
      const mailVerification = await mailTransporter.verify();
      if (!mailVerification) throw new ApolloError("MAIL_SERVER_ERROR");

      return await Promise.all([
        mailHelper.getNoReplyEmail(),
        userHelpers.getUserEmailAddressWithName(user.id),
        mailHelper.renderEmailSubject("PWD_RESTED_SUBJECT"),
      ])
        .then(async (values) => {
          const [from, to, subject] = values;
          // Get the email node modules
          const options = {
            from,
            to,
            subject,
            template: "resetpassword",
            context: {
              name: user.firstName,
            },
          };
          try {
            const info = await mailTransporter.sendMail(options);
            const nodemailer = require("nodemailer");
            console.log({
              ...info,
              url: "Preview URL: " + nodemailer.getTestMessageUrl(info),
            });
            return true;
          } catch (error) {
            console.log({ error });
            throw new ApolloError("MAIL_SERVER_ERROR");
          }
        })
        .catch((error) => {
          console.log({ error });
          throw new ApolloError("MAIL_SERVER_ERROR");
        });
    },

    /**
     * Change the user password
     * @param oldpassword String
     * @param newpassword String
     * @param newpassword2 String
     */
    async updateMyPassword(
      _,
      { oldpassword, newpassword, newpassword2, user }
    ) {
      // Make sure user is logged in
      if (!user) {
        throw new ApolloError(
          // i18nHelper.__("NOT_AUTHENTICATED"),

          "NOT_AUTHENTICATED"
        );
      }

      // Check if the two passwords are the same
      if (
        newpassword == "" ||
        newpassword != newpassword2 ||
        newpassword == oldpassword
      ) {
        throw new ApolloError(
          //   i18nHelper.__("PASSWORDS_NOT_OK"),
          "PASSWORDS_NOT_OK"
        );
      }
      console.log({ user: user.email, oldpassword });
      // Get the employee by the token email
      if (!(await userHelpers.verifyEmailPassword(user.email, oldpassword))) {
        throw new ApolloError(
          //   i18nHelper.__("OLD_PASSWORD_NOT_OK"),
          "OLD_PASSWORD_NOT_OK"
        );
      }

      // Update the password
      user = await userHelpers.setNewPassword(newpassword, user.id);
      if (!user) {
        throw new ApolloError(
          // i18nHelper.__("SERVER_ERROR"),
          "SERVER_ERROR"
        );
      }

      const fromEmail = await mailHelper.getNoReplyEmail();
      const mailTransporter = await mailHelper.createTransport();

      // If OK, send email
      // Get the email node modules
      /*const helperOptions = {
        from: fromEmail,
        to: await userHelpers.getUserEmailAddressWithName(0, user),
        subject: await mailHelper.renderEmailSubject("PWD_RESTED_SUBJECT"),
        template: "resetpassword",
        context: {
          name: user.prenom,
          sexe: user.sexe,
        },
      };

      const r = mailTransporter.verify((error, success) => {
        if (error) {
          throw new Error(error);
        } else {
          mailTransporter.sendMail(helperOptions, (error, info) => {
            if (error) {
              throw new Error(error);
            }
            let nodemailer = require("nodemailer");
            console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));

            return info.response;
          });
          return true;
        }
      });*/
      return true;
    },

    async updateProfilePicture(_, { file }, { user }) {
      console.log("##########");
      console.log({ file });

      // Upload the file
      const { mimetype } = await file;
      console.log(mimetype);
      const today = new Date();
      const mimeType_temp = mimetype.split("/");
      const picture = await utlsHlprs.uploadFile({
        destination: config.folders.upload_user,
        file: file,
        allowedFileMime: ["image/jpeg", "image/jpg", "image/png"],
        savedFileName:
          "" +
          today.getFullYear() +
          ("0" + (today.getMonth() + 1)).slice(-2) +
          today.getDate() +
          "-" +
          today.getTime() +
          "-" +
          1 +
          "." +
          mimeType_temp[1],
      });
      console.log({ picture });
      if (!picture) {
        console.error("[CatuServer] Error saving the file.");
        throw new ApolloError("SERVER_ERROR", "SERVER_ERROR");
      }

      return await utlsHlprs.renderProfilePictureUrl(picture);
    },

    async setProfilePicture(_, { file }, { user }) {
      // Make sure user is logged in
      // if (!user) {
      //   throw new ApolloError("NOT_AUTHENTICATED", "NOT_AUTHENTICATED");
      // }

      // Upload the file
      const { mimetype } = await file;
      const today = new Date();
      const mimeType_temp = mimetype.split("/");
      console.log(mimeType_temp);
      const newProfilePicture = await utlsHlprs.uploadFile({
        destination: config.folders.upload_user,
        file: file,
        allowedFileMime: ["image/jpeg", "image/jpg", "image/png"],
        savedFileName:
          "" +
          today.getFullYear() +
          ("0" + (today.getMonth() + 1)).slice(-2) +
          today.getDate() +
          "-" +
          today.getTime() +
          "-" +
          2 +
          "." +
          mimeType_temp[1],
      });
      console.log({ newProfilePicture });

      if (!newProfilePicture) {
        console.error("[CatuServer] Error saving the file.");
        throw new ApolloError(i18nHelper.__("SERVER_ERROR"), "SERVER_ERROR");
      }

      // Update the DB
      const picutreUrl = await userHelpers.setProfilePicture(
        user.id_Emp,
        newProfilePicture
      );
      if (!picutreUrl) {
        console.error("[CatuServer] Error updating the profile in DB.");
        throw new ApolloError(i18nHelper.__("SERVER_ERROR"), "SERVER_ERROR");
      }

      return picutreUrl;
    },

    async toggleUserActivation(_, { id, active }, { user }) {
      console.log("toggleUserActivation : ");
      try {
        // const access = await userHelpers.hasAccess(
        //   "users",
        //   "can_edit",
        //   user.id
        // );
        // if (!access) {
        //   console.log("cant toogleUserActivation");
        //   return false;
        // }
        await userHelpers.activateDeactivate(id, active);
        return true;
      } catch (e) {
        console.log("error while trying to toggle user acivation");
        console.log(e);
        return false;
      }
      return false;
    },

    /**
     * Check access
     */
    async userHasAccess(_, { accessSlug }, { user }) {
      // Make sure user is logged in
      if (!user) {
        throw new ApolloError(
          i18nHelper.__("NOT_AUTHENTICATED"),
          "NOT_AUTHENTICATED"
        );
      }

      // Get the employee by the token email
      if (!(await userHelpers.hasAccess(accessSlug, user.id_Emp))) {
        return false;
      }

      return true;
    },
  },
};

module.exports = resolvers;
