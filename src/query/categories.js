import {gql} from "@apollo/client";
import {client} from "../index";

export const GET_CATEGORIES = () => {
    return client
        .query({
            query: gql`
      query GET_CATEGORIES {
         categories{
            name
    }
      }
    `,
        })
        .then(result => result.data.categories);
}


export const GET_CATEGORY_PRODUCTS = (category) => {
    return client
        .query({
            query: gql`
      query GET_CATEGORY_PRODUCTS ($category: String!){
         category(input: {
    title: $category
  }){
    products{
      name, 
      id, 
      gallery, 
      inStock,
      brand,
      attributes{
            id, name, type, items{
              displayValue, value, id
            }
          },
      prices  {
            amount, 
                currency{
                    label, symbol
                    }
                }
           }
      }
    }
    `,
            variables: { category }
        })
        .then(result => result.data.category.products);
}




//
// export const GET_ALL_PRODUCTS = () => {
//     return client
//         .query({
//             query: gql`
//       query GET_ALL_PRODUCTS {
//           categories{
//                name,
//                products{
//                     name, id, gallery, inStock
//                 }
//           }
//       }
//     `,
//         })
//         .then(result => result.data);
// }

