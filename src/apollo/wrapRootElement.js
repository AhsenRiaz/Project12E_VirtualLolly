import React from 'react'
import {ApolloProvider} from "@apollo/client"
import {Client} from "./Client"

export const wrapRootElement = ({element}) => {
    return (
       <ApolloProvider client = {Client} >{element}</ApolloProvider>
    )
}

