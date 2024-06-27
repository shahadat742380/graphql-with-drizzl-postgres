import { graphqlDb } from "../index.js";
import { Users } from "../schemas/index.js";
import { eq } from "drizzle-orm";

export const resolvers = {
  Query: {
    getAllUsers: async (_: any, { limit }: {limit: number}) => {
      try {
        const results = await graphqlDb.select().from(Users).limit(limit).execute();
        return results;
      } catch (err) {
        console.log(err);
      }
    },
    getUserById: async (_: any, { id }: { id: number }) => {
      try {
        const [result] = await graphqlDb.select().from(Users).where(eq(Users.id, id)).execute();;
        return result;
      } catch (err) {
        console.log(err);
      }
    },
  },

  Mutation: {
    createUser: async (_: any, { userInput }: { userInput: { first_name: string; last_name: string; email: string } }) => {
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
        await graphqlDb
          .delete(Users)
          .where(eq(Users.id, id))
          .execute();
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    updateUser: async (_: any, { updateInput }: { updateInput: { id: number; first_name?: string; last_name?: string; email?: string } }) => {
      try {
        const { id, first_name, last_name, email } = updateInput;
        const result = await graphqlDb
          .update(Users)
          .set({ 
            ...(first_name && { first_name }), 
            ...(last_name && { last_name }), 
            ...(email && { email })
          })
          .where(eq(Users.id, id))
          .returning();
        console.log(result);
        return result[0];
      } catch (err) {
        console.log(err);
      }
    },
  },
};
