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
const index_js_1 = require("../schemas/index.js");
exports.resolvers = {
    Query: {
        getAllUsers: (_1, __1, _a) => __awaiter(void 0, [_1, __1, _a], void 0, function* (_, __, { db }) {
            const results = yield db.select().from(index_js_1.users).execute();
            return results;
        }),
        getUser: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { id }, { db }) {
            const result = yield db
                .select()
                .from(index_js_1.users)
                .where("id", "=", parseInt(id, 10))
                .execute();
            console.log("run the mutation");
            return result[0];
        }),
    },
    Mutation: {
        createUser: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { name }, { db }) {
            const result = yield db.insert(index_js_1.users).values({ name });
            console.log("run the mutation");
            return result;
        }),
        updateUser: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { id, name }, { db }) {
            const result = yield db
                .update(index_js_1.users)
                .set({ name })
                .where("id", "=", parseInt(id, 10))
                .execute();
            return result;
        }),
        deleteUser: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { id }, { db }) {
            const result = yield db
                .delete(index_js_1.users)
                .where("id", "=", parseInt(id, 10))
                .execute();
            return result;
        }),
    },
};
