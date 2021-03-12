import { graphQLSchemaExtension } from "@keystone-next/keystone/schema";
import { addToCart } from "./addToCart";

//make a fake syntax highlighter
const graphql = String.raw;
export const extendGraphqlShema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID!): CartItem
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
    },
  },
});
