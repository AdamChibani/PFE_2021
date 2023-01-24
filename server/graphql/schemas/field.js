const { gql } = require("apollo-server-express");

module.exports = gql`
  type Field {
    id: ID!
    name: String!
    specialty: String!
  }
  extend type Query {
    getAllFields: [Field!]
    getAllFieldsByConsultant(consultantId: Int!): [Field!]
    getSingleField(id: Int!): Field
  }

  input updateFieldsInput {
    id: Int
    name: String
    specialty: String
  }
  extend type Mutation {
    createField(name: String!, specialty: String!): Field
    updateField(id: Int, name: String, specialty: String, pId: Int): Field
    updateFields(input: [updateFieldsInput!]!, pId: Int!): Boolean

    deleteField(id: Int!): Boolean
    setFieldToUser(id: Int!): Boolean
  }
`;
