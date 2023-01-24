const { gql } = require("apollo-server-express");

module.exports = gql`
  type Skill {
    id: Int!
    name: String!
    developer: String!
  }

  extend type Query {
    getAllSkills: [Skill!]
    getAllSkillsByConsultant(consultantId: Int!): [Skill!]
    getSingleSkill(skillId: Int!): Skill
  }
  input updateSkillsInput {
    id: Int
    name: String
    developer: String
  }
  extend type Mutation {
    createSkill(name: String!, developer: String!): Skill
    updateSkill(id: Int!, name: String, developer: String): Skill
    updateSkills(input: [updateSkillsInput!]!, pId: Int!): Boolean
    deleteSkill(id: Int!): Boolean
    setSkillToUser(id: Int!): Boolean
  }
`;
