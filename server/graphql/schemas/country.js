const { gql } = require("apollo-server-express");

module.exports = gql`
  type Country {
    id: ID!
    name: String!
    continent: Continent
  }

  extend type Query {
    getAllCountries: [Country!]
    getAllCountriesByContinent(contient: Int!): [Country!]
    getSingleCountry(ID: ID!): Country
    getCountryByName(name: String!): Country
  }
  input linkInput {
    countryId: Int!
    preferenceId: Int!
    newCountry: String!
  }
  extend type Mutation {
    createCountry(name: String!, continent: Int!): Country
    updateCountry(id: ID!, name: String!, contient: Int!): Country
    deleteCountry(id: ID!): Int
    updateLinks(input: linkInput!): Boolean
  }
`;
