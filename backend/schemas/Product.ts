import { list } from "@keystone-next/keystone/schema";
import { text, relationship, select, integer } from "@keystone-next/fields";
import { isSignedIn, rules } from "../access";

//https://next.keystonejs.com/apis/schema
export const Product = list({
  access: {
    create: isSignedIn,
    read: isSignedIn,
    update: rules.canManageProducts,
    delete: rules.canManageProducts,
  },
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    photo: relationship({
      ref: `ProductImage.product`,
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText"] },
        inlineEdit: { fields: ["image", "altText"] },
      },
    }),
    status: select({
      options: [
        { label: "Draft", value: "DRAFT" },
        { label: "Available", value: "AVAILABLE" },
        { label: "Unavailable", value: "UNAVAILABLE" },
      ],
      defaultValue: "DRAFT",
      ui: {
        displayMode: "segmented-control",
        createView: { fieldMode: "hidden" },
      },
    }),
    //cents
    price: integer(),
    //when product is created make a relationship with the user who created it
    user:relationship({
      ref:'User.products',
      //defaultValue will be currently signed in user
      defaultValue:({context})=>({connect:{id:context.session.itemId}})
    })
  },
});
