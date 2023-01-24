const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: Int
    email: String!
    company: Company
    firstName: String!
    lastName: String!
    gender: Gender!
    post: String
    profile: Profile
    profileImage: String
    language: String
    direction: String
    active: Boolean
    lastIp: String
    lastLogin: String
    lastPasswordChange: String
    role: Role
    isEnterpriseAdmin: Boolean
    company_id: Int
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  enum Gender {
    Male
    Female
  }
  extend type Query {
    me: User
    users: [User!]
    getAllEnterpriseAdmins: [User!]
    getUserById(id: Int): User
    myProfile(id: Int!): User
  }
  type Role {
    id: Int
    name: String
    accesses: [Access]
  }

  type Access {
    id: Int
    privilege_id: Int
    name: String
    slug: String
    can_view: Boolean
    can_view_own: Boolean
    can_edit: Boolean
    can_create: Boolean
    can_delete: Boolean
    page_flag: Boolean
  }

  input RoleInput {
    id: Int
    name: String
  }

  input AccessInput {
    id: Int
    name: String
    slug: String
  }

  extend type Query {
    roles(ids: [Int]): [Role]
    getRoleId(name: String!): Int
    accesses(ids: [Int]): [Access]
  }

  extend type Mutation {
    privilege(role: Int!, slug: String!, privilege: String!): Boolean
    role(item: RoleInput!): Role
  }
  input UserMDP {
    id: Int
    email: String
  }
  extend type Mutation {
    login(input: LoginInput): LoginResponse
    signup(data: UserInput): Int
    assignConsultant(userId: Int!, agencyId: Int!): Int
    setAgencyAdmin(userId: Int!): Int
    dismissConsultant(userId: Int!): Int
    deleteUser(userID: Int!): Int
    updateUser(input: UserInput!): User
    user(data: UserInput): Boolean
    forgetPassword(email: String): Boolean

    resetPassword(token: String!, newpassword: String!): Boolean

    updateMyPassword(
      oldpassword: String!
      newpassword: String!
      newpassword2: String!
      user: UserMDP
    ): Boolean
    updateProfilePicture(file: Upload!): String!
    setProfilePicture(file: Upload!): String!
    toggleUserActivation(id: Int!, active: Boolean): Boolean
    userHasAccess(accessSlug: String): Boolean
  }
  input FullUser {
    id: Int
    email: String!
    phone: Int!
    company: Int
    firstName: String!
    lastName: String!
    profile: Int
    profileImage: String
    language: String
    direction: String
    active: Boolean
    lastIp: String
    lastLogin: String
    lastPasswordChange: String
    role: RoleInput
  }
  input UserInput {
    id: Int
    email: String
    firstName: String
    lastName: String
    password: String
    profileImage: String
    language: String
    direction: String
    role: RoleInput
    gender: Gender
    company_id: Int
    role_id: Int
    isEnterpriseAdmin: Boolean
  }
  type RegisterResponse {
    id: Int!
    name: String!
    lastName: String!
    email: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type LoginResponse {
    user: User!
    token: String!
  }
`;
