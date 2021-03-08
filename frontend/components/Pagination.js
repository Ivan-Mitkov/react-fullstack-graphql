import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import PaginationStyles from "./styles/PaginationStyles";
import ErrorMessage from "./ErrorMessage";
import { perPage } from "../config";

const ALL_PRODUCTS_COUNT = gql`
  query ALL_PRODUCTS_COUNT {
    _allProductsMeta {
      count
    }
  }
`;
const Pagination = ({ page }) => {
  const { loading, error, data } = useQuery(ALL_PRODUCTS_COUNT);
  if (loading) return "";
  if (error) return <ErrorMessage error={error}></ErrorMessage>;
  //calculate pages
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>Sick - Fits | Page - {page}</title>
      </Head>
      <Link href={`/products/${parseInt(page) - 1}`}>
        <a aria-disabled={page <= 1}>Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <Link href={`/products/${parseInt(page) + 1}`}>
        <a aria-disabled={page >= pageCount}>Next</a>
      </Link>
      <p>{count} Items Total</p>
    </PaginationStyles>
  );
};

export default Pagination;
