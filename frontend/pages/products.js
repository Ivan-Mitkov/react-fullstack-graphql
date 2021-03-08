import React from "react";
import Products from "../components/Products";
import Pagination from "../components/Pagination";
const ProductsPage = () => {
  return (
    <div>
      <Pagination page={7}></Pagination>
      <Products />
      <Pagination page={1}></Pagination>
    </div>
  );
};

export default ProductsPage;
