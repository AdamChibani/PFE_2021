const userResolvers = require("./user/resolver");
const profileResolvers = require("./profile/resolvers");
const skillResolvers = require("./skill/resolvers");
const preferenceResolvers = require("./preferences/resolvers");
const fieldResolvers = require("./fields/resolvers");
const certificationResolvers = require("./certifications/resolvers");
const projectResolvers = require("./project/resolvers");
const experienceResolvers = require("./experience/resolvers");
const languageResolvers = require("./languages/resolvers");
const affiliationResolvers = require("./affiliation/resolvers");
const accessResolvers = require("./access/resolvers");
const educationResolvers = require("./education/resolvers");
const majorResolvers = require("./major/resolvers");
const diplomaResolvers = require("./diploma/resolvers");
const countryResolvers = require("./country/resolvers");
const companyResolvers = require("./company/resolvers");
const messagerieResolvers = require("./messagerie/resolvers");
const messageResolvers = require("./message/resolvers");
const stateResolvers = require("./state/resolvers");
const nationalityResolvers = require("./nationalities/resolver");
const officeResolvers = require("./offices/resolvers");
module.exports = [
  companyResolvers,
  userResolvers,
  profileResolvers,
  skillResolvers,
  preferenceResolvers,
  fieldResolvers,
  certificationResolvers,
  projectResolvers,
  experienceResolvers,
  languageResolvers,
  affiliationResolvers,
  accessResolvers,
  educationResolvers,
  majorResolvers,
  diplomaResolvers,
  countryResolvers,
  messagerieResolvers,
  messageResolvers,
  stateResolvers,
  nationalityResolvers,
  officeResolvers,
];
