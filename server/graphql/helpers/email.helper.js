const nodemailer = require("nodemailer");
const handlebars = require("express-handlebars");
const hbs = require("nodemailer-express-handlebars");
const i18nHelper = require("./i18n.helper");
const utilsHelpers = require("./utils.helper");
const path = require("path");

const emailHelpers = {
  transporter: null,
  options: {
    from: null,
  },
  async createTransport() {
    // Creat the mail transporter
    const mailConfig = {
      host: "smtp.gmail.com",
      secureConnection: false,
      port: 587,
      requiresAuth: true,
      domains: ["gmail.com", "googlemail.com"],
      auth: {
        user: "chibani.adam99@gmail.com",
        pass: "Genix999",
      },
    };
    const mailTransport = nodemailer.createTransport(mailConfig);

    // Get the Handlebars optionq
    const hls = handlebars.create({
      extName: ".hls",
      partialsDir: path.join(
        __dirname,
        "../../assets/email-templates/partials"
      ),
      layoutsDir: path.join(__dirname, "../../assets/email-templates"),
      defaultLayout: false,
      helpers: {
        translate: (str) => {
          return i18nHelper != undefined ? i18nHelper.__(str) : str;
        },
        t: (str) => {
          return i18nHelper != undefined ? i18nHelper.__(str) : str;
        },
        // TODO add a greating by gender
        greetingByGender: function (name, sexe) {
          /* if (sexe == undefined || sexe == "M") {
            return i18nHelper.__("HELLO_M") + " " + name;
          } else {
            return i18nHelper.__("HELLO_F") + " " + name;
          }*/
          return i18nHelper.__("hello") + " " + name;
        },
      },
    });

    const handlebarOptions = {
      viewEngine: hls,
      viewPath: path.join(__dirname, "../../assets/email-templates"),
    };

    this.options.from = await this.getNoReplyEmailAsync();

    mailTransport.use("compile", hbs(handlebarOptions));
    this.transporter = mailTransport;
    return mailTransport;
  },
  verify() {
    return new Promise((resolve, reject) => {
      if (!this.transporter) reject(false);
      this.transporter
        .verify()
        .then(() => resolve(true))
        .catch(() => reject(false));
    });
  },
  async sendMail(options) {
    const transporter = this.transporter;
    if (!options.from) {
      options.from = this.options.from;
    }
    if (options.subject) {
      options.subject = await this.subject(options.subject);
    }
    console.log(options);
    return new Promise((resolve, reject) => {
      transporter.sendMail(options, function (error, info) {
        if (error) reject(error);
        else resolve(info);
      });
    });
  },
  renderEmailSubject(str) {
    const prefix = "";
    const subject = str;
    if (prefix == "") return subject;
    return prefix + " | " + subject;
  },
  subject(a) {
    this.renderEmailSubject(a);
  },
  async getNoReplyEmail() {
    return "adam-mithiax@hotmail.fr";
  },
  async getNoReplyEmailAsync() {
    return "Tekru" + " <" + "adam-mithiax@hotmail.fr" + ">";
  },
};
module.exports = emailHelpers;
