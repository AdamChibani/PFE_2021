const { gql } = require("apollo-server-express");

module.exports = gql`
  type Certification {
    id: ID
    name: String!
    category: String!
    instution: String!
    date: String!
    duration: Int!
    level: String!
  }
  extend type Query {
    getAllCertifications: [Certification!]
    getAllCertificationsByConsultant(consultantId: Int!): [Certification!]
    getSingleCertification(id: Int!): Certification
  }
  input certificationInput {
    name: String!
    category: String!
    instution: String!
    date: String!
    duration: Int!
    level: String!
  }
  input certificationUpdateInput {
    id: Int!
    name: String
    category: String
    instution: String
    date: String
    duration: Int
    level: String
  }
  input UpdateCertificationsInput {
    id: Int
    name: String
    category: String
    instution: String
    date: String
    duration: Int
    level: String
  }
  extend type Mutation {
    createCertification(input: certificationInput): Certification
    updateCertification(input: certificationUpdateInput): Certification
    updateCertifications(
      input: [UpdateCertificationsInput!]!
      pId: Int!
    ): Boolean
    deleteCertification(id: Int!): Boolean
  }
`;
