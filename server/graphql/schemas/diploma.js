const { gql } = require("apollo-server-express");

module.exports = gql`
  type Diploma {
    id: ID!
    diploma: String!
  }
  extend type Query {
    getAllDiplomas: [Diploma!]
    getSingleDiploma(id: ID!): Diploma
    getAllDiplomasByEducation(educationId: Int!): Diploma
  }
  input DiplomaUpdate {
    id: Int!
    diploma: String
  }
  input DiplomaInput {
    id: Int
    diploma: String
  }
  extend type Mutation {
    createDiploma(diploma: String!): Diploma
    updateDiploma(input: DiplomaUpdate): Diploma
    deleteDiploma(id: ID!): Int
  }
`;
