const { gql } = require("apollo-server-express");

module.exports = gql`
  type Office {
    id: Int!
    name: String!
    address: Address!
  }

  extend type Query {
    getAllOffices(id: Int!): [Office!]
    getSingleOffice(officeID: Int!): Office
  }
  input CreateOfficeInput {
    name: String!
    address: Int!
  }
  input UpdateOfficeInput {
    id: Int
    name: String
    address: Int
    street: String
    city: String
    postal_code: String
    country_id: Int
    company_id: Int
  }
  extend type Mutation {
    createOffice(input: CreateOfficeInput): Office
    updateOffice(input: UpdateOfficeInput): Office
    updateOffices(input: [UpdateOfficeInput!]!): Boolean
    deleteOffice(branchID: ID!): Int
  }
`;
