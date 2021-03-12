export const calcTotalPrice = (cart) => {
  
  const totalPrice = cart
    .map((x) => {
      if(!x.product)return 0;
      return x.product.price * x.quantity})
    .reduce((acc, item) => acc + item, 0);
  return totalPrice;
};
