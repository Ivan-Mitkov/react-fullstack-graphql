import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/link-error";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { createUploadLink } from "apollo-upload-client";
import withApollo from "next-with-apollo";
import { endpoint, prodEndpoint } from "../config";
import paginationField from "./paginationField";
function createClient({ headers, initialState }) {
  return new ApolloClient({
    link: ApolloLink.from([
      //https://www.apollographql.com/docs/react/api/link/apollo-link-error/
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          );
      }),
      // this uses apollo-link-http under the hood, so all the options here come from that package https://github.com/jaydenseric/apollo-upload-client#function-formdataappendfile this package allow FILE UOLOAD

      createUploadLink({
        uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
        fetchOptions: {
          credentials: "include",
        },
        // pass the headers along from this request. This enables SSR with logged in state
        headers,
      }),
    ]),
    //https://www.apollographql.com/docs/react/caching/cache-configuration/#typepolicy-fields
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allProducts: paginationField(),
          },
        },
      },
    }).restore(initialState || {}),
  });
}

//https://www.npmjs.com/package/next-with-apollo withApollo receives 2 parameters, the first one is a function that returns the Apollo Client The getDataFromTree function takes your React tree, determines which queries are needed to render them, and then fetches them all.
export default withApollo(createClient, { getDataFromTree });
