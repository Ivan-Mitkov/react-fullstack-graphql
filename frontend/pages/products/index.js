import React from "react";
import { useRouter } from "next/router";
import Products from "../../components/Products";
import Pagination from "../../components/Pagination";
const ProductsPage = () => {
  const router = useRouter();
  const { query } = router;
  return (
    <div>
      <Pagination page={query.page || 1}></Pagination>
      <Products />
      <Pagination page={query.page || 1}></Pagination>
    </div>
  );
};

export default ProductsPage;
