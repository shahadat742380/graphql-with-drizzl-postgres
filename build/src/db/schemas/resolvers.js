"use strict";
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
exports.resolvers = void 0;
const index_js_1 = require("../index.js");
const index_js_2 = require("../schemas/index.js");
exports.resolvers = {
    Query: {
        getAllUsers: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { limit }) {
            try {
                const results = yield index_js_1.graphqlDb.select().from(index_js_2.Users).limit(limit).execute();
                return results;
            }
            catch (err) {
                console.log(err);
            }
        }),
    },
    Mutation: {
        createUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userInput }) {
            try {
                const { first_name, last_name, email } = userInput;
                const [result] = yield index_js_1.graphqlDb
                    .insert(index_js_2.Users)
                    .values({ first_name, last_name, email })
                    .returning();
                console.log([result]);
                return result;
            }
            catch (error) {
                console.log(error);
            }
        }),
    },
};
