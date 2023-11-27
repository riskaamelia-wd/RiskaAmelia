import { gql } from "@apollo/client";

export const ADDCONTACT = gql`
    mutation MyMutation($object: contact_insert_input= {}) {
        insert_contact_one(object: $object) {
        email
        id
        message
        name
        phone
        }
    }
`