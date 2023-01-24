const { gql } = require("apollo-server-express");

module.exports = gql`
  type Messagerie {
    id: Int
    sender: User
    receiver: [User!]
    messages: [Message!]
    opened: Boolean
    subject: String
    createdAt: String
  }

  extend type Query {
    getSingleMessagerie(messagerieID: Int!): Messagerie
    getMessagerieByConsultant(id: Int!): [Messagerie!]
    getCount(id: Int!): Int
    getCountAll(id: Int!): Int
    getOpenedMessagerie(id: Int!): [Messagerie!]

    getUnopenedMessagerie(id: Int!): [Messagerie!]
    getAllMessagerieByEnterprise(senderID: Int!): [Messagerie!]
  }

  extend type Mutation {
    createMessagerie(
      senderID: Int!
      receiver: [Int!]
      subject: String!
    ): Messagerie
    deleteMessagerie(id: Int!): Boolean
  }
`;
