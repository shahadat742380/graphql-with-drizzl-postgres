import { users } from "../schemas/index.js";

export const resolvers = {
  Query: {
    getAllUsers: async (_: any, __: any, { db }: { db: any }) => {
      const results = await db.select().from(users).execute();
      return results;
    },
    getUser: async (_: any, { id }: { id: string }, { db }: { db: any }) => {
      const result = await db
        .select()
        .from(users)
        .where("id", "=", parseInt(id, 10))
        .execute();

        console.log("run the mutation")
      return result[0];
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { name }: { name: string },
      { db }: { db: any }
    ) => {
      const result = await db.insert(users).values({ name });
      console.log("run the mutation")
      return result;
    },
    updateUser: async (
        _: any,
        { id, name }: { id: string; name: string },
        { db }: { db: any }
      ) => {
        const result = await db
          .update(users)
          .set({ name })
          .where("id", "=", parseInt(id, 10))
          .execute();
        return result;
      },
      deleteUser: async (
        _: any,
        { id }: { id: string },
        { db }: { db: any }
      ) => {
        const result = await db
          .delete(users)
          .where("id", "=", parseInt(id, 10))
          .execute();
        return result;
      },
  },
};
