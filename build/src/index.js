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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_postgres_1 = require("drizzle-orm/node-postgres");
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
// Import schema
const dbSchema = __importStar(require("./db/schemas/index.js"));
const index_js_1 = __importDefault(require("./db/index.js"));
const typeDefs__js_1 = require("./db/schemas/typeDefs .js");
const resolvers_js_1 = require("./db/schemas/resolvers.js");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const PORT = Number(process.env.PORT) || 5000;
    try {
        yield index_js_1.default.connect();
        // Initialize Drizzle-ORM with schema
        const graphqlDb = (0, node_postgres_1.drizzle)(index_js_1.default, { schema: dbSchema });
        const server = new server_1.ApolloServer({
            typeDefs: typeDefs__js_1.typeDefs,
            resolvers: resolvers_js_1.resolvers,
            // @ts-ignore
            context: () => ({ db: graphqlDb }),
        });
        // const schema = buildSchema(graphqlDb);
        // const server = new ApolloServer( schema );
        // @ts-ignore
        const { url } = yield (0, standalone_1.startStandaloneServer)(server, {
            listen: { port: PORT },
        });
        console.log(`🚀 Server ready at ${url}`);
    }
    catch (error) {
        console.error("Failed to connect to the database", error);
    }
    finally {
        yield index_js_1.default.end();
    }
});
init();
