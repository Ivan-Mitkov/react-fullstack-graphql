import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import { perPage } from "../config";
export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(skip: $skip, first: $first) {
      id
      name
      description
      price
      photo {
        id
        image {
          publicUrlTransformed
        }
        altText
      }
    }
  }
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;
const Products = ({ page }) => {
  //first page skip 0, second page skip perPage, third skip all in firts two pages
  const skipItems = (page - 1) * perPage;

  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: { skip: skipItems, first: perPage },
  });
  // console.log(error, loading, data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <ProductList>
        {data?.allProducts.map((p) => (
          <ProductItem key={p.id} product={p} />
        ))}
      </ProductList>
    </div>
  );
};

export default Products;
