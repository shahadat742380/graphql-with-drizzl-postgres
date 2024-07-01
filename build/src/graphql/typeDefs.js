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

  type getAllTodo {
    userId: Int,
    id: Int!,
    title: String!,
    completed: Boolean
    toUser: TodoUser
  }

  type TodoUser {
    id: Int!
    name: String!
    username: String
    email : String!
    phone: String
    website: String
  }

  type Query {
    getAllUsers(limit: Int): [User]!
    getUserById(id: Int!): User
    getAllBooks(limit: Int): [Book]
    getBookById(id: Int!): Book

    getTodo: [getAllTodo]
    getAllTodoUser: [TodoUser]
    getTodoUserById(id: Int!): TodoUser

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
