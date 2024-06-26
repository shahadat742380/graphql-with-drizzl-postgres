"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
  type User {
    id: Int
    name: String!
  }

  type Query {
  getAllUsers: [User]!
    getUser(id: Int!): User
    
  }

  type Mutation {
    createUser(name: String!): User
  }
`;
