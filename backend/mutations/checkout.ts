import { KeystoneContext } from "@keystone-next/types";
import {
  CartItemCreateInput,
  CartItemsCreateInput,
  OrderCreateInput,
} from "../.keystone/schema-types";
import stripeConfig from "../lib/stripe";

interface Arguments {
  token: string;
}

const graphql = String.raw;
async function checkout(
  root: any,
  { token }: Arguments,
  context: KeystoneContext
): Promise<OrderCreateInput> {
  //1.Make sure they are signed in
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error("You must be logged in to do this");
  }

  //2. Query the current user
  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
    id
     name
     email
     cart {
        id
        quantity
        product {
          name
          price
          description
          id
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
     }`,
  });
  // console.dir(user, { depth: null });
  //3.calculate total price of the order
  //3.1 filter products whish are not available
  const cartItems = user.cart.filter((p) => p.product);
  const totalPrice = cartItems
    .map((p) => p.product.price * p.quantity)
    .reduce((acc: number, price: number) => acc + price, 0);
  // console.log(totalPrice);
  //4.create the charge with stripe library
  //https://stripe.com/docs/api/payment_intents/create?lang=node
  const charge = await stripeConfig.paymentIntents
    .create({
      amount: totalPrice,
      currency: "BGN",
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err.message);
      throw new Error(err.message);
    });
  // console.log(charge);
  //5.convert cartItems to orderItems
  const orderItems = cartItems.map((cartItem) => {
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      //make connection
      photo: { connect: { id: cartItem.product.photo.id } },
    };
    return orderItem;
  });
  //6.create order and return it
  const order = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      //create relationship with order items before creating order
      items: { create: orderItems },
      user: { connect: { id: userId } },
    },
  });
  //7.clean up old cart items
  //get unfiltered cart item and delete as cart item even if product is null
  const cartItemsIds = user.cart.map((cartItem) => cartItem.id);
  await context.lists.CartItem.deleteMany({
    ids: cartItemsIds,
  });
  //
  return order;
}

export { checkout };
