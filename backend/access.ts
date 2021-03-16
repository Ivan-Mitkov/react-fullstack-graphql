//ACCESS CONTROL FUNCTIONS
//they have acces to the context and inside context we have acces to the user session
//they must return true or false

import { permissionsList } from "./schemas/fields";
import { ListAccessArgs } from "./types";

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((p) => [
    p,
    ({ session }: ListAccessArgs) => !!session?.data.role?.[p],
  ])
);
//Permission check if somebody meets a criteria yes/no
export const permissions = {
  ...generatedPermissions,
  // canManageProducts({ session }) {
  //   return session?.data.role?.canManageProducts;
  // }, and ... all others
};

//Rule based functions - used for lists access
//can return boolean or a filter which limits which product they can CRUD
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
     //if not signed in no access
     if (!isSignedIn({ session })) {
      return false;
    }
    //1.Have are permission of canManageProducts
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    //2. If not do they own the product?
    //graphql where clauses
    return { user: { id: session.itemId } };
  },
  canOrder({ session }: ListAccessArgs) {
    //if not signed in no access
    if (!isSignedIn({ session })) {
      return false;
    }
    //1.Have are permission of canManageProducts
    if (permissions.canManageCart({ session })) {
      return true;
    }
    //2. If not do they own the product?
    //graphql where clauses
    return { user: { id: session.itemId } };
  },
  canReadProducts({ session }: ListAccessArgs) {
     //if not signed in no access
     if (!isSignedIn({ session })) {
      return false;
    }
    //1.Have are permission of canManageProducts - can read everything
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    //can see only available products based on status
    //graphql where clauses
    return { status: "AVAILABLE" };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
     //if not signed in no access
     if (!isSignedIn({ session })) {
      return false;
    }
    //1.Have are permission of canManageProducts
    if (permissions.canManageCart({ session })) {
      return true;
    }
    //2. If the own the order in which is the order item
    //graphql where clauses query the order then the user and then check the id
    return { order: { user: { id: session.itemId } } };
  },
};
