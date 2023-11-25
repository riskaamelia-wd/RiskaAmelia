import { gql } from "@apollo/client";

export const GETPORTFOLIO = gql`
    query MyQuery {
        portfolio {
        category
        date
        desc
        id
        img
        title
        }
    }
`