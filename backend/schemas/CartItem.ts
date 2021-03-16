import { list } from "@keystone-next/keystone/schema";
import { text, relationship, select, integer } from "@keystone-next/fields";
import { isSignedIn, rules } from "../access";

//https://next.keystonejs.com/apis/schema
export const CartItem = list({
  access: {
    create: isSignedIn,
    read: rules.canOrder,
    update: rules.canOrder,
    delete: rules.canOrder,
  },
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
