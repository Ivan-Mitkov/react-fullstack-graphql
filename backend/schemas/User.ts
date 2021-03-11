import { list } from "@keystone-next/keystone/schema";
import { text, password, relationship } from "@keystone-next/fields";

//https://next.keystonejs.com/apis/schema
export const User = list({
  //access
  //ui

  fields: {
    //https://next.keystonejs.com/apis/fields#text
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    //https://next.keystonejs.com/apis/fields#password
    password: password(),
    //TODO: add cart, roles and orders
    cart: relationship({
      ref: "CartItem.user",
      many: true,
      //ui: Controls how the field is displayed in the Admin UI.
      ui: {
        createView: {
          fieldMode: "hidden",
        },
        itemView: {
          fieldMode: "read",
        },
      },
    }),
  },
});
