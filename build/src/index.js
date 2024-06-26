"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const dbSchema = __importStar(require("./schemas/index.js"));
const schema_1 = require("@graphql-tools/schema");
const graphql_tag_1 = require("graphql-tag");
// Initialize the PostgreSQL client
const client = new pg_1.Client({
    connectionString: "postgresql://postgres:742380@localhost:5432/drizzle-with-postgres?schema=public",
    ssl: false, // Disable SSL
});
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const PORT = Number(process.env.PORT) || 5000;
    try {
        yield client.connect();
        // Initialize Drizzle-ORM with schema
        const db = (0, node_postgres_1.drizzle)(client, { schema: dbSchema });
        // Define GraphQL schema
        const typeDefs = (0, graphql_tag_1.gql) `
      type User {
        id: Int!
        name: String!
      }

      type Query {
        users: [User!]!
      }

      type Mutation {
        createUser(name: String!): User!
      }
    `;
        // Define resolvers
        const resolvers = {
            Query: {
                users: () => __awaiter(void 0, void 0, void 0, function* () {
                    return yield dbSchema.users.findMany();
                }),
            },
            Mutation: {
                createUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { name }) {
                    const [newUser] = yield dbSchema.users.insert({ name }).returning('*');
                    return newUser;
                }),
            },
        };
        // Build the executable schema
        const schema = (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers });
        // Create and start Apollo Server
        const server = new server_1.ApolloServer({ schema });
        const { url } = yield (0, standalone_1.startStandaloneServer)(server, {
            listen: { port: PORT },
        });
        console.log(`🚀 Server ready at ${url}`);
    }
    catch (error) {
        console.error("Failed to connect to the database", error);
    }
    finally {
        yield client.end();
    }
});
init();
