import { gql, useQuery } from "@apollo/client";

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        name
        email
        # Todo query the card
      }
    }
  }
`;
export function useUser() {
  const {data} = useQuery(CURRENT_USER_QUERY);
  // console.log(data);
  return data?.authenticatedItem;
}
