export const typeDefs = `#graphql
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
