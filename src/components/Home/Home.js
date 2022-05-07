import React from "react"

import Error from "../Error/Error"
import Loading from "../loading/Loading"
import Restaurant from "../Restaurant/RestaurantPreview"
import { withHtmlPageMetadata } from "../HtmlPageMetadata"
import { useRestaurants } from "../Restaurant/RestaurantApi"

function Home() {
  const { loading, restaurants , error } = useRestaurants()
console.log("render", restaurants)
  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  return (
    <section>
      {restaurants.map((restaurant) => (
        <Restaurant restaurant={restaurant} key={restaurant.id} />
      ))}
    </section>
  )
}

export default withHtmlPageMetadata(
  "GraphQL demo app - firenze.dev",
  "GraphQL demo app implementation using React and Apollo, made by firenze.dev"
)(Home)
