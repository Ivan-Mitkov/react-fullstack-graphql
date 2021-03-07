import React from "react";
import Link from "next/link";
import ItemStyles from "./styles/ItemStyles";
import Title from "./styles/Title";
import PriceTag from "./styles/PriceTag";
import { formatMoney } from "../lib/formatMoney";

const ProductItem = ({ product }) => {
  const price = formatMoney(product.price);
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product?.photo?.image?.altText}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product?.name}</Link>
      </Title>
      <PriceTag>{price}</PriceTag>
      <p>{product.description}</p>
      {/* TODO: add buttons to edit and delete */}
      <div className="button-list">
        <Link
          href={{
            pathname: "update",
            query: {
              id: product.id,
            },
          }}
        >
          Edit
        </Link>
      </div>
    </ItemStyles>
  );
};

export default ProductItem;
