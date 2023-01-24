const { gql } = require("apollo-server-express");

module.exports = gql`
  type Address {
    street: String!
    city: String!
    postalCode: String!
    country: Country!
  }

  extend type Query {
    getAllAdresses: [Address!]
    getByCountry(country: String!): [Address!]
    getByState(country: String!, state: String!): [Address!]
    getByCity(country: String!, state: String!, city: String!): [Address!]
    getByStreet(
      country: String!
      state: String!
      city: String!
      street: String!
    ): Address
  }

  extend type Mutation {
    createAddress(
      street: String!
      city: String!
      state: String!
      postalCode: String!
      country: String!
    ): Address
    updateAddress(
      street: String!
      city: String!
      state: String!
      postalCode: String!
      country: String!
    ): Address
    deleteAddress(
      street: String!
      city: String!
      state: String!
      postalCode: String!
      country: String!
    ): Int
  }
`;
