export const typeDefs = `#graphql

  scalar Date


  type User {
    id: Int
    first_name: String!
    last_name: String!
    email: String!
    password: String!
  }

  input UserInput {
    first_name: String!
    last_name: String!
    email: String! 
    password: String!
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
    created_at: Date!
    updated_at: Date!
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

  type UserList {
    userData: [User]!
    totalCount: Int
    totalPages: Int
  }

  type AuthData {
    userId: ID!
    token: String!
  }

  type Query {
    getAllUsers(offset:Int limit: Int search: String): UserList
    getUserById(id: Int!): User
    getAllBooks(limit: Int): [Book]
    getBookById(id: Int!): Book
    getCurrentLoggedInUser: User!

    getTodo: [getAllTodo]
    getAllTodoUser: [TodoUser]
    getTodoUserById(id: Int!): TodoUser
  }

  type Mutation {
    createUser(userInput: UserInput!): User
    deleteUser(id: Int!): Boolean
    updateUser(updateInput: UpdateUserInput!): User
    login(email: String!, password: String!): AuthData!

    createBook(bookInput: BookInput): Book
    deleteBook(id: Int!): Boolean
    updateBook(updateInput: UpdateBookInput): Book

  }
`;
