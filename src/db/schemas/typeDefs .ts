export const typeDefs = `#graphql
  type User {
    id: Int
    first_name: String!
    last_name: String!
    email: String!
  }

  input UserInput {
    first_name: String!
    last_name: String!
    email: String!
  }
  

  type Query {
    getAllUsers(limit: Int): [User]!
  }

  type Mutation {
    createUser(userInput: UserInput!): User
  }
`;
