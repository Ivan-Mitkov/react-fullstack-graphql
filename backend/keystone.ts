import "dotenv/config";
import { config, createSchema } from "@keystone-next/keystone/schema";
import { createAuth } from "@keystone-next/auth";
import {
  statelessSessions,
  withItemData,
} from "@keystone-next/keystone/session";
import { User } from "./schemas/User";
import { Product } from "./schemas/Product";
import { CartItem } from "./schemas/CartItem";
import { ProductImage } from "./schemas/ProductImage";
import { insertSeedData } from "./seed-data";
import {sendPasswordResetEmail} from './lib/mail'

const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost/keystone-sick-fits";
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30, //how long should stay signed in
  secret: process.env.COOKIE_SECRET,
};
//https://next.keystonejs.com/apis/auth
const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
    //TODO: Add in initial roles
  },
  passwordResetLink: {
    sendToken: async (args) => {
      await sendPasswordResetEmail(args.token,args.identity)
    },
  },
});
//https://next.keystonejs.com/apis/config
export default withAuth(
  config({
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
      //https://next.keystonejs.com/apis/config#mongoose
      onConnect: async (ctx) => {
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(ctx);
        }
      },
    },
    lists: createSchema({
      //schema items go here
      User,
      Product,
      ProductImage,
      CartItem
    }),
    ui: {
      //Show the ui only for peopla that pass this test
      // isAccessAllowed: () => true,
      isAccessAllowed: ({ session }) => {
        // console.log(session);
        return session?.data;
      },
    },
    //https://next.keystonejs.com/apis/session
    session: withItemData(statelessSessions(sessionConfig), {
      //Graphql query
      User: `id name email`,
    }),
  })
);
