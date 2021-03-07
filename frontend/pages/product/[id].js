import React from "react";

const SingleProduct = (pageProps) => {
  console.log('single',pageProps);
  return <div>Name {JSON.stringify(pageProps)}</div>;
};

export default SingleProduct;
