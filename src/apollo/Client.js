import {ApolloClient , InMemoryCache , HttpLink} from "@apollo/client"
import fetch from "cross-fetch";

export const Client = new ApolloClient({
    link : new HttpLink({
        uri : "/.netlify/functions/newLolly",
        fetch
    }),
    cache : new InMemoryCache()
})