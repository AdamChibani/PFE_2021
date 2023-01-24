const { gql } = require("apollo-server-express");

module.exports = gql`
  type PersonOfContact {
    Id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: Int!
    position: String!
  }
`;
