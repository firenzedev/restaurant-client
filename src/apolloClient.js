import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
// import { persistCache } from "apollo3-cache-persist"

const cache = new InMemoryCache()

// persistCache({
//   cache,
//   storage: window.localStorage
// }).then(() => {
//   // Continue setting up Apollo Client as usual.
// })

const httpLink = new HttpLink({
  uri: "https://graphql-restaurant-server.herokuapp.com/graphql"
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: cache
})

export default apolloClient
