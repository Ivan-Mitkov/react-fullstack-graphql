import { list } from "@keystone-next/keystone/schema";
import {
  text,
  relationship,
  select,
  integer,
  virtual,
} from "@keystone-next/fields";
import formatMoney from "../lib/formatMoney";
import { isSignedIn, rules } from "../access";

//If Product is change what is ordered stays the same
//https://next.keystonejs.com/apis/schema
export const Order = list({
  access:{
    create:isSignedIn,
    read:rules.canOrder,
    update:()=>false,
    delete:()=>false
  },
  fields: {
    label: virtual({
      graphQLReturnType: "String",
      resolver: function (item) {
        return `${item.user} total cost ${formatMoney(item.total)}`;
      },
    }),
    total: integer(),
    items: relationship({
      ref: "OrderItem.order",
      many: true,
    }),
    user: relationship({
      ref: "User.orders",
    }),
    charge: text(),
  },
});
