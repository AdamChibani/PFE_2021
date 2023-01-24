const { gql } = require("apollo-server-express");
const addressType = require("../schemas/address");
const companyType = require("../schemas/company");
const countryType = require("../schemas/country");
const diplomaType = require("../schemas/diploma");
const fieldType = require("../schemas/field");
const majorType = require("../schemas/major");
const messageType = require("../schemas/message");
const messagerieType = require("../schemas/messagerie");
const officeType = require("../schemas/office");
const personOfContactType = require("../schemas/personOfContact");
const preferenceType = require("../schemas/preference");
const profileType = require("../schemas/profile");
const skillType = require("../schemas/skill");
const stateType = require("../schemas/state");
const userType = require("../schemas/user");
const certificationType = require("../schemas/certification");
const continentType = require("../schemas/continent");

const rootType = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

module.exports = [
  rootType,
  addressType,
  companyType,
  countryType,
  diplomaType,
  fieldType,
  majorType,
  messageType,
  messagerieType,
  officeType,
  personOfContactType,
  preferenceType,
  profileType,
  skillType,
  stateType,
  userType,
  certificationType,
  continentType,
];
