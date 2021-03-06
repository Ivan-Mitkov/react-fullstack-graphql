import "dotenv/config";
import { config, createSchema } from "@keystone-next/keystone/schema";
import { User } from "./schemas/User";
const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost/keystone-sick-fits";
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30, //how long should stay signed in
  secret: process.env.COOKIE_SECRET,
};
//https://next.keystonejs.com/apis/config
export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: "mongoose",
    url: databaseURL,
    //TODO: add data seeding
  },
  lists: createSchema({
    //schema items go here
    User,
  }),
  ui: {
    //TODO:change this for roles
    isAccessAllowed: () => true,
  },
  //TODO: add session values here
});
