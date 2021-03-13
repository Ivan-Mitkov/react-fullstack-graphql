import { graphQLSchemaExtension } from "@keystone-next/keystone/schema";
import { addToCart } from "./addToCart";
import { removeFromCart } from "./removeFromCart";

//make a fake syntax highlighter
const graphql = String.raw;
export const extendGraphqlShema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID!): CartItem
      removeFromCart(productId: ID!): CartItem
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
      removeFromCart,
    },
  },
});
