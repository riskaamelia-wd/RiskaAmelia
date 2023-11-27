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

export const GETCONTACT = gql`
    query MyQuery {
        contact {
        email
        id
        message
        name
        phone
        }
    }
`