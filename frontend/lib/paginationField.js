import { ALL_PRODUCTS_QUERY } from "../components/Products";
import { ALL_PRODUCTS_COUNT } from "../components/Pagination";

export default function paginationField() {
  return {
    //we will take care of everything https://www.apollographql.com/docs/react/pagination/key-args/#gatsby-focus-wrapper
    keyArgs: false,
    //https://www.apollographql.com/docs/react/caching/cache-field-behavior/
    // https://www.apollographql.com/docs/react/caching/cache-field-behavior/#handling-pagination
    // https://www.apollographql.com/docs/react/caching/cache-field-behavior/#fieldpolicy-api-reference
    read(existing = [], { args, cache }) {
      // console.log(existing, args, cache);
      const { skip, first } = args;
      //Read the number of items on the page from the cache
      const data = cache.readQuery({ query: ALL_PRODUCTS_COUNT });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      //check if we got existing items into the cache and filter undefined
      const items = existing.slice(skip, skip + first).filter((x) => x);
      //last page is probably not full
      if (items.length && items.length !== first && page === pages) {
        //we have items but there are less then first and we are on the last page so just retun items
        return items;
      }
      //full pages
      if (items.length !== first) {
        //we don't have any items and must go to the network
        return false;
      }
      //if there are items return them from the cache and send them to apollo
      if (items.length) {
        return items;
      }
      //Apollo asks read function for those queried items
      //return items because they are in the cache
      //return false so make network request
      return false; //falback to network
    },
    //Apollo client comes back from network how to merge the result with cache

    merge(existing, incoming, { args }) {
      // console.log(existing, incoming, args);
      const { skip, first } = args;
      const merged = existing ? existing.slice(0) : [];
      //there must be slots for previous items
      for (let i = skip; i < skip + incoming.length; i++) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}
