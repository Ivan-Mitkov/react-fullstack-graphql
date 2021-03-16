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

