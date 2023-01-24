const { gql } = require("apollo-server-express");

module.exports = gql`
  type Message {
    id: Int!
    messagerieId: Int!
    authorId: Int!
    content: String!
    createdAt: String
    sender: User
  }
  extend type Query {
    getAllMessages(messagerieId: Int!): [Message!]
  }
  extend type Mutation {
    createMessage(messagerieId: Int!, authorId: Int!, content: String!): Message
    createFirstMsg(
      messagerieId: Int!
      authorId: Int!
      content: String!
    ): Message

    deleteMessage(messageId: Int!): Int
    updateMessage(messageId: Int!, content: String!): Message
  }
`;
