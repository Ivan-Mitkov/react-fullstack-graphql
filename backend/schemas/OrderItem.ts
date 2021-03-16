import { list } from "@keystone-next/keystone/schema";
import { text, relationship, select, integer } from "@keystone-next/fields";
import { isSignedIn, rules } from "../access";

//If Product is change what is ordered stays the same
//https://next.keystonejs.com/apis/schema
export const OrderItem = list({
  //access
  access:{
    create:isSignedIn,
    read:rules.canManageOrderItems,
    update:()=>false,
    delete:()=>false
  },

  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    photo: relationship({
      //not two way relationship
      ref: `ProductImage`,
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText"] },
        inlineEdit: { fields: ["image", "altText"] },
      },
    }),

    //cents
    price: integer(),
    quantity: integer(),
    order: relationship({
      ref: "Order.items",
    }),
  },
});
