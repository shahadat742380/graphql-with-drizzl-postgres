import { graphqlDb } from "../index.js";
import { Users } from "../schemas/index.js";

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
  },
};
