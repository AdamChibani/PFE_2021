const { gql } = require("apollo-server-express");

module.exports = gql`
  type State {
    id: Int!
    name: String!
  }

  extend type Query {
    getAllStates: [State!]
    getSingleState: State
  }

  extend type Mutation {
    createState(name: String!): State
    updateState(id: Int!, name: String!): State
    deleteState(id: Int!): Int
  }
`;
