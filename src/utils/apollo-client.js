import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri : 'https://welcomed-horse-54.hasura.app/v1/graphql',
    cache : new InMemoryCache(),
    headers : {
        'x-hasura-admin-secret' : '3z9AxbAl9HuvHQtPyrHXL0hxbXORpKKQKTTFxZj6zjuwWFRhJ0kmAFeqRbqvgTiS'
    }
})

export default client 