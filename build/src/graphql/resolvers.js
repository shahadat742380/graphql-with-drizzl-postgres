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
const index_js_1 = require("../db/index.js");
const index_js_2 = require("../db/schemas/index.js");
const drizzle_orm_1 = require("drizzle-orm");
exports.resolvers = {
    Query: {
        getAllUsers: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { limit }) {
            try {
                const results = yield index_js_1.graphqlDb
                    .select()
                    .from(index_js_2.Users)
                    .limit(limit)
                    .execute();
                return results;
            }
            catch (err) {
                console.log(err);
            }
        }),
        getUserById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            try {
                const [result] = yield index_js_1.graphqlDb
                    .select()
                    .from(index_js_2.Users)
                    .where((0, drizzle_orm_1.eq)(index_js_2.Users.id, id))
                    .execute();
                return result;
            }
            catch (err) {
                console.log(err);
            }
        }),
        // Book related query
        getAllBooks: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { limit }) {
            const result = yield index_js_1.graphqlDb
                .select()
                .from(index_js_2.Books)
                .limit(limit)
                .execute();
            return result;
        }),
        getBookById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            const [result] = yield index_js_1.graphqlDb
                .select()
                .from(index_js_2.Books)
                .where((0, drizzle_orm_1.eq)(index_js_2.Books.id, id))
                .execute();
            return result;
        }),
    },
    Mutation: {
        createUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userInput, }) {
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
        deleteUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            try {
                yield index_js_1.graphqlDb.delete(index_js_2.Users).where((0, drizzle_orm_1.eq)(index_js_2.Users.id, id)).execute();
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        }),
        updateUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { updateInput, }) {
            try {
                const { id, first_name, last_name, email } = updateInput;
                const result = yield index_js_1.graphqlDb
                    .update(index_js_2.Users)
                    .set(Object.assign(Object.assign(Object.assign({}, (first_name && { first_name })), (last_name && { last_name })), (email && { email })))
                    .where((0, drizzle_orm_1.eq)(index_js_2.Users.id, id))
                    .returning();
                console.log(result);
                return result[0];
            }
            catch (err) {
                console.log(err);
            }
        }),
        // Book related mutation
        createBook: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { bookInput, }) {
            const { author_name, title, year } = bookInput;
            const [result] = yield index_js_1.graphqlDb
                .insert(index_js_2.Books)
                .values({ author_name, title, year })
                .returning();
            return result;
        }),
        deleteBook: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            yield index_js_1.graphqlDb.delete(index_js_2.Books).where((0, drizzle_orm_1.eq)(index_js_2.Books.id, id)).execute();
            return true;
        }),
        updateBook: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { updateInput, }) {
            const { id, author_name, title, year } = updateInput;
            const [result] = yield index_js_1.graphqlDb
                .update(index_js_2.Books)
                .set(Object.assign(Object.assign(Object.assign({}, (author_name && { author_name })), (title && { title })), (year && { year })))
                .where((0, drizzle_orm_1.eq)(index_js_2.Books.id, id))
                .returning();
            return result;
        }),
    },
};
