const { gql } = require("apollo-server-express");

module.exports = gql`
  type Company {
    id: Int!
    name: String!
    offices: [Office!]!
    enterpriseSize: Int!
    taxId: Int!
    isAgency: Boolean!
    email: String!
    phone: Int!
    fields: [Field!]
    # merge adress and company and add state_id as an object
    street: String!
    city: String!
    postalCode: String!
    country: Country!
    states: State
    consultants: [User!]
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    getAllCompanies: [Company!]
    getAllAgencies: [Company!]
    getAllEnterprises: [Company!]
    getSingleCompany(id: Int!): Company
    getAgenciesConsultants(id: Int!): [User!]
    getAgenciesWorkers(id: Int!, profile: Int!): [User!]
    getCompanyByAdmin(id: Int!): Company
  }
  input createEntInput {
    id: Int
    name: String!
    enterpriseSize: Int!
    taxId: Int!
    phone: Int!
    street: String!
    city: String!
    postalCode: String!
    countries: Int!
    states: Int!
    offices: [Int!]!
    email: String!
  }
  input createAgInput {
    id: Int
    name: String!
    enterpriseSize: Int!
    taxId: Int!
    phone: Int!
    street: String!
    city: String!
    postalCode: String!
    country_id: Int!
    state_id: Int!
    userId: Int!
    email: String!
    isAgency: Int!
  }
  input updateAgInput {
    id: Int
    name: String
    enterpriseSize: Int
    taxId: Int
    phone: Int
    street: String
    city: String
    postalCode: String
    country_id: Int
    state_id: Int

    email: String
  }
  extend type Mutation {
    createEnterprise(input: createAgInput): Company
    updateEnterprise(input: createEntInput): Company
    deleteCompany(id: Int!): Int
    createAgency(input: createAgInput): Company
    updateAgency(input: updateAgInput): Int
  }

  type CreateAgencyResponse {
    id: Int
    name: String
    enterpriseSize: Int
    taxId: Int
    phone: Int
    street: String
    email: String

    city: String
    postalCode: String
    country_id: Country
    state_id: State
    offices: [Int!]
    patent: String
    admin: [User!]
  }

  type CreateEnterpriseResponse {
    id: Int
    name: String
    email: String

    createdAt: String
  }
`;
