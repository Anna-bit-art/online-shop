import {client} from "../index";
import {gql} from "@apollo/client";

export const GET_CURRENCIES = () => {
    return client
        .query({
            query: gql`
      query GET_CURRENCIES {
         currencies{
            label, symbol
    }
      }
    `,
        })
        .then(result => result.data.currencies);
}
