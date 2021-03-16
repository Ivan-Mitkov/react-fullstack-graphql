import { list } from "@keystone-next/keystone/schema";
import { text, password, relationship } from "@keystone-next/fields";
import { permissions, rules } from "../access";

//https://next.keystonejs.com/apis/schema
export const User = list({
  //access
  access: {
    create: true,
    read: rules.canManageUsers,
    //people with permission and the logged in user himself
    update: rules.canManageUsers,
    //only people with the permission to edit users
    delete: permissions.canManageUsers,
  },
  //ui
  ui: {
    hideCreate: (args) => !permissions.canManageUsers(args),
    hideDelete: (args) => !permissions.canManageUsers(args),
  },
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
    orders: relationship({
      ref: "Order.user",
      many: true,
    }),
    //Roles and Permissions
    role: relationship({
      ref: "Role.assignedTo",
      //can add acces control to individual field
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers,
      },
    }),
    //create relatioship with the product
    products: relationship({
      ref: "Product.user",
      many: true,
    }),
  },
});
