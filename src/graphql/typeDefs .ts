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

  input UpdateUserInput {
    id: Int!
    first_name: String
    last_name: String
    email: String
  }

  type Book{
    id: Int
    author_name: String!
    title: String!
    year: String!
  }

   input BookInput{
    author_name: String!
    title: String!
    year: String!
  }

  input UpdateBookInput{
   id: Int!
    author_name: String
    title: String
    year: String
  }
  

  type Query {
    getAllUsers(limit: Int): [User]!
    getUserById(id: Int!): User
    getAllBooks(limit: Int): [Book]
    getBookById(id: Int!): Book
  }

  type Mutation {
    createUser(userInput: UserInput!): User
    deleteUser(id: Int!): Boolean
    updateUser(updateInput: UpdateUserInput!): User

    createBook(bookInput: BookInput): Book
    deleteBook(id: Int!): Boolean
    updateBook(updateInput: UpdateBookInput): Book
  }
`;
