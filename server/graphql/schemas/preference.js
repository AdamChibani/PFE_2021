const { gql } = require("apollo-server-express");

module.exports = gql`
  type Preference {
    id: Int
    name: String
    countries: [Country!]
    status: String
    updatedAt: String
  }

  extend type Query {
    getAllPreferences: [Preference!]
    getAllPreferencesByConsultant(consultantID: Int!): [Preference!]
    getSinglePreference(id: Int!): Preference
  }
  input PreferenceInput {
    name: String!
    status: String!
  }
  input PreferenceUpdate {
    id: Int!
    name: String
    status: String
    countryId: [Int]
  }
  input UpdatePreferencesInput {
    id: Int
    name: String
    status: String
    countryId: [Int]
  }
  extend type Mutation {
    createPreference(input: PreferenceInput): Preference
    updatePreference(input: PreferenceUpdate): Preference
    updatePreferences(input: [UpdatePreferencesInput!]!, pId: Int!): Boolean
    deletePreference(id: Int!): Boolean
  }
`;
