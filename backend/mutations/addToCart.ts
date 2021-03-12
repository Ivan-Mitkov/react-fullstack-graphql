import { KeystoneContext } from "@keystone-next/types";
import { CartItemCreateInput } from "../.keystone/schema-types";
import { Session } from "../types";

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  // console.log("ADD TP CART");
  //1. query current user and see if he is signed in
  const currentSession = context.session as Session;
  if (!currentSession.itemId) {
    throw new Error("You must be logged in to do this");
  }
  //2.query current user cart go directly to the DB from keystone
  //get schema for CartItem and findMany because this fields are not unique
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: currentSession.itemId }, product: { id: productId } },
    //what fields we want, this is from keystone
    resolveFields: "id quantity",
  });
  // console.log("ALL CART ITEMS", allCartItems);
  // console.log("Product ID", productId);
  const [existingCartItem] = allCartItems;
  //3. see if item to add is already in the cart

  if (existingCartItem) {
    // console.log("this item is the cart");
    // console.log(existingCartItem.id);
    //4. if it is increment quantity by 1
    // console.dir(context.lists.CartItem);
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }

  //5. if it is not create new cart item
  return await context.lists.CartItem.createOne({
    data: {
      //make relationships
      product: { connect: { id: productId } },
      user: { connect: { id: currentSession.itemId } },
    },
  });
}

export { addToCart };
