const { gql } = require("apollo-server-express");

module.exports = gql`
  type Major {
    id: ID!
    type: EducationType!
    major: String!
  }

  enum EducationType {
    BolognaProcess
    US
  }

  extend type Query {
    getAllMajors: [Major!]
    getSingleMajor(id: Int!): Major
    getAllMajorsByEducation(educationId: Int!): Major
  }
  input MajorInput {
    type: EducationType!
    major: String!
  }
  input MajorUpdate {
    id: Int!
    type: EducationType
    major: String
  }
  input MajorUpdate2 {
    id: Int
    type: EducationType
    major: String
  }
  extend type Mutation {
    createMajor(input: MajorInput): Major
    updateMajor(input: MajorUpdate): Major
    deleteMajor(id: Int!): Boolean
  }
`;
