import { list } from "@keystone-next/keystone/schema";
import { text, relationship, select, integer } from "@keystone-next/fields";

//https://next.keystonejs.com/apis/schema
export const CartItem = list({
  ui: {
    listView: {
      initialColumns: ["product", "user", "quantity"],
    },
  },
  fields: {
    //TODO:custom label
    quantity: integer({
      defaultValue: 1,
      isRequired: true,
    }),
    product: relationship({ ref: "Product" }),
    user: relationship({ ref: "User.cart" }), //two way relationship
  },
});
