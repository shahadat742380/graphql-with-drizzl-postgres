import { graphqlDb } from "../db/index.js";
import { Users, Books } from "../db/schemas/index.js";
import { eq } from "drizzle-orm";

export const resolvers = {
  Query: {
    getAllUsers: async (_: any, { limit }: { limit: number }) => {
      try {
        const results = await graphqlDb
          .select()
          .from(Users)
          .limit(limit)
          .execute();
        return results;
      } catch (err) {
        console.log(err);
      }
    },
    getUserById: async (_: any, { id }: { id: number }) => {
      try {
        const [result] = await graphqlDb
          .select()
          .from(Users)
          .where(eq(Users.id, id))
          .execute();
        return result;
      } catch (err) {
        console.log(err);
      }
    },
    // Book related query
    getAllBooks: async (_: any, { limit }: { limit: number }) => {
      const result = await graphqlDb
        .select()
        .from(Books)
        .limit(limit)
        .execute();
      return result;
    },
    getBookById: async (_: any, { id }: { id: number }) => {
      const [result] = await graphqlDb
        .select()
        .from(Books)
        .where(eq(Books.id, id))
        .execute();
      return result;
    },
  },

  Mutation: {
    createUser: async (
      _: any,
      {
        userInput,
      }: { userInput: { first_name: string; last_name: string; email: string } }
    ) => {
      try {
        const { first_name, last_name, email } = userInput;
        const [result] = await graphqlDb
          .insert(Users)
          .values({ first_name, last_name, email })
          .returning();
        console.log([result]);
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    deleteUser: async (_: any, { id }: { id: number }) => {
      try {
        await graphqlDb.delete(Users).where(eq(Users.id, id)).execute();
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    updateUser: async (
      _: any,
      {
        updateInput,
      }: {
        updateInput: {
          id: number;
          first_name?: string;
          last_name?: string;
          email?: string;
        };
      }
    ) => {
      try {
        const { id, first_name, last_name, email } = updateInput;
        const result = await graphqlDb
          .update(Users)
          .set({
            ...(first_name && { first_name }),
            ...(last_name && { last_name }),
            ...(email && { email }),
          })
          .where(eq(Users.id, id))
          .returning();
        console.log(result);
        return result[0];
      } catch (err) {
        console.log(err);
      }
    },

    // Book related mutation
    createBook: async (
      _: any,
      {
        bookInput,
      }: { bookInput: { author_name: string; title: string; year: string } }
    ) => {
      const { author_name, title, year } = bookInput;
      const [result] = await graphqlDb
        .insert(Books)
        .values({ author_name, title, year })
        .returning();

      return result;
    },
    deleteBook: async (_: any, { id }: { id: number }) => {
      await graphqlDb.delete(Books).where(eq(Books.id, id)).execute();
      return true;
    },
    updateBook: async (
      _: any,
      {
        updateInput,
      }: {
        updateInput: {
          id: number;
          author_name: string;
          title: string;
          year: string;
        };
      }
    ) => {
      const { id, author_name, title, year } = updateInput;
      const [result] = await graphqlDb
        .update(Books)
        .set({
          ...(author_name && { author_name }),
          ...(title && { title }),
          ...(year && { year }),
        })
        .where(eq(Books.id, id))
        .returning();

        return result;
    },
  },
};
