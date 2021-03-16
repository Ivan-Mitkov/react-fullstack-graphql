//ACCESS CONTROL FUNCTIONS
//they have acces to the context and inside context we have acces to the user session
//they must return true or false

import { ListAccessArgs } from "./types";

export function isSignedIn({ session }:ListAccessArgs) {
  return !!session;
}
