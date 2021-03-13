import React from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import { resetIdCounter, useCombobox } from "downshift";
import gql from "graphql-tag";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";
import debounce from "lodash.debounce";

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchResults: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const Search = () => {
  const router = useRouter();
  //use query when needed
  const [searchResults, { loading, error, data }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: "no-cache",
    }
  );
  //items to show in dropdown
  const items = data?.searchResults || [];
  console.log(data);
  console.log(items);
  //DEBONCE search
  const debounceFind = debounce(searchResults, 500);
  //Allows reseting the internal id counter which is used to generate unique ids for Downshift component.
  resetIdCounter();
  //https://github.com/downshift-js/downshift
  //https://github.com/downshift-js/downshift/tree/master/src/hooks/useCombobox
  const reRouteEndRest = (id) => {};
  const {
    isOpen,
    inputValue,
    getComboboxProps,
    getInputProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    reset,
  } = useCombobox({
    items: items,
    onInputValueChange() {
      console.log("Input");
      debounceFind({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({ pathname: `/product/${selectedItem.id}` });
    },
    //for [object Object]
    itemToString: (item) => {
      if (typeof item !== String) {
        return "";
      } else {
        return item;
      }
    },
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: "search",
            placeholder: "Search",
            id: "search",
            className: loading ? "loading" : "",
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, i) => {
            return (
              <DropDownItem
                key={item.id}
                {...getItemProps({ item })}
                highlighted={i === highlightedIndex}
              >
                <img
                  src={item.photo.image.publicUrlTransformed}
                  alt={item.name}
                  width="50px"
                ></img>
                {item.name}
              </DropDownItem>
            );
          })}
        {isOpen && items.length === 0 && !loading && (
          <DropDownItem>Sorry, no items found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
};

export default Search;
