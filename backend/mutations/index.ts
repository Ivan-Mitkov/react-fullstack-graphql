import { graphQLSchemaExtension } from "@keystone-next/keystone/schema";
import { addToCart } from "./addToCart";
import { removeFromCart } from "./removeFromCart";
import { checkout } from "./checkout";

//make a fake syntax highlighter
const graphql = String.raw;
export const extendGraphqlShema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID!): CartItem
      removeFromCart(productId: ID!): CartItem
      checkout(token:String!):Order
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
      removeFromCart,
      checkout,
    },
  },
});
