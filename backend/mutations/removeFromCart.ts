import { KeystoneContext } from "@keystone-next/types";
import { CartItemCreateInput } from "../.keystone/schema-types";
import { Session } from "../types";

async function removeFromCart(
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
  console.log("CART ITEM: ", existingCartItem);
  if (existingCartItem.quantity > 1) {
    // console.log("this item is the cart");
    // console.log(existingCartItem.id);
    //4. if it is deccrement quantity by 1
    // console.dir(context.lists.CartItem);
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity - 1 },
    });
  } else {
    //if it's only one delete product from cart
    if (existingCartItem.quantity === 1) {
      return await context.lists.CartItem.deleteOne({
        id: existingCartItem.id,
      });
    } else {
      //som border case shouldn't be able to reach here
      throw new Error("Product is not in cart");
    }
  }
}

export { removeFromCart };
