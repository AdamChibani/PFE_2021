const { gql } = require("apollo-server-express");

module.exports = gql`
  type Continent {
    id: ID!
    name: Cont!
  }
  enum Cont {
    Asia
    Africa
    NorthAmerica
    SouthAmerica
    Antarctica
    Europe
    Australia
    Any
  }
  extend type Query {
    getAllContinents: [Continent!]
    getSingleContinent: Continent
  }

  extend type Mutation {
    createContinent(name: String!): Continent
    updateContinent(ID: ID!, name: String!): Continent
    deleteContinent(ID: ID!): Int
  }
`;
