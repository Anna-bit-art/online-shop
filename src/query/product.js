import {client} from "../index";
import {gql} from "@apollo/client";

export const GET_PRODUCT = (id) => {
    return client
        .query({
            query: gql`
      query GET_PRODUCT($id: String!) {
        product(id:$id){
          id, 
          name,
          inStock,
          gallery,
          description,
          category,
          brand,
          attributes{
            id, name, type, items{
              displayValue, value, id
            }
          },
          prices{
            amount, 
            currency{
               label, symbol
            }
          }
  }
      }
    `,
            variables: { id },
        })
        .then(result => result.data.product);
}


