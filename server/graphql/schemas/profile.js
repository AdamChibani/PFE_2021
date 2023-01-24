const { gql } = require("apollo-server-express");

module.exports = gql`
  type Profile {
    id: Int!
    hourRate: Int
    phone: Int!
    years: Int
    website: String
    nationalities: Nationality!
    driversLicense: DriversLicense!
    affiliations: [Affiliation!]
    languages: [Language!]
    preferences: [Preference!]
    educations: [Education!]
    skills: [Skill!]
    fields: [Field!]
    experiences: [Experience!]
    projects: [Project!]
    user: User
    certifications: [Certification!]
    isAgencyAdmin: Boolean
    createdAt: String
    clicks: Int
    state: Int
  }
  type Language {
    id: Int
    language: String!
    read: Level!
    write: Level!
    speak: Level!
    comprehend: Level!
  }
  enum Level {
    Native
    Fluent
    Conversational
    Elementary
    Beginner
    Bad
  }
  type Affiliation {
    id: Int
    group: String!
    startDate: String!
    endDate: String!
    post: String!
  }
  type Nationality {
    id: Int!
    male: String!
    female: String!
  }

  enum DriversLicense {
    A1
    A
    B
    EB
    C1
    C
    EC1
    EC
  }
  type Education {
    # diploma
    id: Int
    majors: Major
    diplomas: Diploma
    specialty: String
    startDate: String!
    endDate: String!
    university: String!
  }

  type Experience {
    id: Int
    jobTitle: String!
    description: String!
    startDate: String!
    endDate: String!
    employer: String!
    company: String!
    poFirstName: String!
    poLastName: String!
    poEmail: String!
    poPhoneNumber: Int!
    poPosition: String!
  }
  type Project {
    id: Int
    projectTitle: String!
    jobTitle: String!
    scope: String!
    startDate: String!
    endDate: String!
    employer: String!
    company: String!
    poFirstName: String!
    poLastName: String!
    poEmail: String!
    poPhoneNumber: Int!
    poPosition: String!
  }

  # type Date {
  #   day: Int!
  #   month: Int!
  #   year: Int!
  # }
  input Filter {
    jobType: [String!]
    field: String
    country: Int
    hourRate: [Int]
    diploma: [String!]
    years: [[String!]]
  }
  extend type Query {
    getAllNationalities: [Nationality!]
    getByFilter(input: Filter): [Profile!]
    getAllProfiles: [Profile!]
    getSingleProfile(id: Int): Profile
    getMyProfile(id: Int!): Profile
    getAllConsultants: [Profile!]
    getAllExperiences: [Experience!]
    getSingleExperience(id: Int): Experience
    getAllExperiencesByConsultant(id: Int): Experience
    getAllProjects: [Project!]
    getSingleProject(id: Int): Project
    getAllProjectsByConsultant(id: Int): [Project!]
    getAllLanguages: [Language!]
    getSingleLanguage(id: Int): Language
    getAllLanguagesByConsultant(id: Int): [Language!]
    getAllAffiliations: [Affiliation!]
    getAllAffiliationsByConsultant(id: Int): Affiliation
    getSingleAffiliation(id: Int): Affiliation
    getAllEducations: [Education!]
    getSingleEducation(id: Int): Education
    getAllEducationsByConsultant(consultantId: Int): [Education!]
  }
  input CreateConsultantProfileInput {
    phone: Int
    hourRate: Int
    years: Int
    preference: Int
    education: Int
    driversLicense: DriversLicense
    website: String
    country: [Int!]
    userId: Int
  }
  input UpdateConsultantProfileInput {
    id: Int
    phone: Int
    hourRate: Int
    years: Int
    preference: Int
    education: Int
    driversLicense: DriversLicense
    website: String
    country: [Int!]
    nationality_id: Int
  }
  input CreateAdminProfileInput {
    phone: Int!
  }
  input updateAdminProfileInput {
    phone: Int
  }
  input ExperienceInput {
    jobTitle: String!
    description: String!
    startDate: String!
    endDate: String!
    employer: String!
    company: String!
    poFirstName: String!
    poLastName: String!
    poEmail: String!
    poPhoneNumber: Int!
    poPosition: String!
  }
  input ExperienceUpdateInput {
    id: Int!
    jobTitle: String
    description: String
    startDate: String
    endDate: String
    employer: String
    company: String
    poFirstName: String
    poLastName: String
    poEmail: String
    poPhoneNumber: Int
    poPosition: String
  }
  input ProjectInput {
    projectTitle: String!
    jobTitle: String!
    scope: String!
    startDate: String!
    endDate: String!
    employer: String!
    company: String!
    poFirstName: String!
    poLastName: String!
    poEmail: String!
    poPhoneNumber: Int!
    poPosition: String!
  }
  input ProjectUpdateInput {
    id: Int!
    projectTitle: String
    jobTitle: String
    scope: String
    startDate: String
    endDate: String
    employer: String
    company: String
    poFirstName: String
    poLastName: String
    poEmail: String
    poPhoneNumber: Int
    poPosition: String
  }
  input UpdateProjectsInput {
    id: Int
    projectTitle: String
    jobTitle: String
    scope: String
    startDate: String
    endDate: String
    employer: String
    company: String
    poFirstName: String
    poLastName: String
    poEmail: String
    poPhoneNumber: Int
    poPosition: String
  }
  input LanguageInput {
    language: String!
    read: Level!
    write: Level!
    speak: Level!
    comprehend: Level!
  }
  input LanguageUpdate {
    id: Int!
    language: String
    read: Level
    write: Level
    speak: Level
    comprehend: Level
  }
  input UpdateLanguagesInput {
    id: Int
    language: String!
    read: Level!
    write: Level!
    speak: Level!
    comprehend: Level!
  }
  input AffiliationInput {
    group: String!
    startDate: String!
    endDate: String!
    post: String!
  }
  input AffiliationUpdate {
    id: Int!
    group: String
    startDate: String
    endDate: String
    post: String
  }
  input EducationUpdate {
    id: Int
    specialty: String
    startDate: String
    endDate: String
    university: String
  }
  input UpdateEducationsInput {
    id: Int
    specialty: String
    startDate: String
    endDate: String
    university: String
    diploma: DiplomaInput
    major: MajorUpdate2
  }
  input EducationInput {
    id: Int!
    specialty: String!
    startDate: String!
    endDate: String!
    university: String!
    major_id: Int!
    diploma_id: Int!
  }
  input UpdateExperiencesInput {
    id: Int
    jobTitle: String
    description: String
    startDate: String
    endDate: String
    employer: String
    company: String
    poFirstName: String
    poLastName: String
    poEmail: String
    poPhoneNumber: Int
    poPosition: String
  }
  extend type Mutation {
    inceremntState(id: Int!, val: Int!): [Int]
    getPDF(id: Int): String
    addClick(id: Int!): [Int]
    createEnterpriseAdminProfile(input: CreateAdminProfileInput): Profile
    createConsultantProfile(input: CreateConsultantProfileInput): Profile
    createAgencyAdminProfile(input: CreateAdminProfileInput): Profile
    updateAdminProfile(input: updateAdminProfileInput): Profile
    updateConsultantProfile(input: UpdateConsultantProfileInput): Profile
    deleteProfile: Boolean
    assignDismissAgencyAdmin(userId: Int!): Boolean
    createExperience(input: ExperienceInput): Experience
    updateExperience(input: ExperienceUpdateInput): Experience
    updateExperiences(input: [UpdateExperiencesInput!]!, pId: Int!): Boolean
    deleteExperience(id: Int): Boolean
    createProject(input: ProjectInput): Project
    updateProject(input: ProjectUpdateInput): Project
    updateProjects(input: [UpdateProjectsInput], pId: Int!): Boolean

    deleteProject(id: Int): Boolean
    createLanguage(input: LanguageInput): Language
    updateLanguage(input: LanguageUpdate): Language
    updateLanguages(input: [UpdateLanguagesInput!]!, pId: Int!): Boolean
    deleteLanguage(id: Int!): Boolean
    setLanguageToUser(id: Int!): Boolean
    createAffiliation(input: AffiliationInput): Affiliation
    updateAffiliation(input: AffiliationUpdate): Affiliation
    deleteAffiliation(id: Int!): Boolean
    updateEducation(input: EducationUpdate): Education
    updateEducations(input: [UpdateEducationsInput!]!, pId: Int!): Boolean

    createEducation(input: EducationInput): Education
    deleteEducation(id: Int!): Boolean
  }
`;
