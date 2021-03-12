export const calcTotalPrice = (cart) => {
  console.log(cart);
  
  const totalPrice = cart
    .map((x) => {
      if(!x.product)return 0;
      return x.product.price * x.quantity})
    .reduce((acc, item) => acc + item, 0);
  console.log(totalPrice);
  return totalPrice;
};
