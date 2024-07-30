import { GraphQLScalarType, Kind } from "graphql";

// Custom Date scalar type
export const GraphQLDate = new GraphQLScalarType({
  name: "Date",
  description: "Custom Date scalar type",
  serialize(value) {
    if (value instanceof Date) {
      return value.toISOString(); // Convert outgoing Date to ISOString for JSON
    }
    return null; // Invalid serialization
  },
  parseValue(value) {
    if (typeof value === "string" || typeof value === "number") {
      return new Date(value); // Convert incoming string or number to Date
    }
    return null; // Invalid input
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); // Convert hard-coded AST string to Date
    }
    return null; // Invalid AST input
  },
});
