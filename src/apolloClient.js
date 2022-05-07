import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

// Create an http link:
const httpLink = new HttpLink({
  // uri: "https://graphql-restaurant-server.herokuapp.com/graphql"
  // uri: "/graphql"
  uri: "http://localhost:8080/graphql"
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default apolloClient
