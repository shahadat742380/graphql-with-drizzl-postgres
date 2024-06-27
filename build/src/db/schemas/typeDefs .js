"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
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
