import { useQuery, useMutation } from "@apollo/client"
import gql from "graphql-tag"
import { useEffect } from "react"

import { useGetAndSet } from "react-context-hook"
import { STORE_VALUES } from "../../Store"

const GET_RESTAURANTS = gql`
  query getRestaurant {
    restaurants {
      name
      address
      rating
      city
      id
      numberOfReviews
    }
  }
`

export const GET_RESTAURANT = gql`
  query getRestaurant($id: ID!) {
    restaurant(id: $id) {
      name
      id
      address
      city
      rating
      numberOfReviews
      reviews {
        message
        rating
        id
      }
    }
  }
`

const ADD_REVIEW = gql`
  mutation createReview($message: String, $restaurantId: ID!, $rating: Int!) {
    createReview(
      input: { message: $message, rating: $rating, restaurantId: $restaurantId }
    ) {
      id
      message
      rating
    }
  }
`

export function useRestaurants() {
  const [restaurants, setRestaurants] = useGetAndSet(
    STORE_VALUES.RESTAURANTS,
    []
  )
  const { loading, data, error } = useQuery(GET_RESTAURANTS, {
    skip: restaurants.length > 0
  })

  useEffect(() => {
    if (data) {
      setRestaurants(data.restaurants)
    }
  }, [data, setRestaurants])

  return { loading, error, restaurants }
}

export function useRestaurant(restaurantId) {
  const [restaurant, setRestaurant] = useGetAndSet(
    STORE_VALUES.RESTAURANT(restaurantId)
  )
  const { loading, data, error } = useQuery(GET_RESTAURANT, {
    variables: { id: restaurantId },
    skip: restaurant !== undefined
  })

  useEffect(() => {
    if (data) {
      setRestaurant(data.restaurant)
    }
  }, [data, setRestaurant])

  return { loading, error, restaurant }
}

export function useAddReview(
  restaurantId,
  message,
  rating,
  onCompleted = () => {}
) {
  const [restaurant, setRestaurant] = useGetAndSet(
    STORE_VALUES.RESTAURANT(restaurantId)
  )
  const [restaurants, setRestaurants] = useGetAndSet(
    STORE_VALUES.RESTAURANTS,
    []
  )

  const [addReview, { loading, error }] = useMutation(ADD_REVIEW, {
    onError: () => {},
    onCompleted: (data) => {
      console.log()
      const numberOfReviews = restaurant.numberOfReviews + 1
      const restaurantUpdated = {
        ...restaurant,
        reviews: [...restaurant.reviews, data.createReview],
        numberOfReviews: numberOfReviews,
        rating:
          (restaurant.rating * restaurant.numberOfReviews +
            data.createReview.rating) /
          numberOfReviews
      }
      setRestaurant(restaurantUpdated)
      setRestaurants(
        restaurants.map((oldRestaurant) =>
          oldRestaurant.id === restaurantUpdated.id
            ? restaurantUpdated
            : oldRestaurant
        )
      )

      onCompleted(data)
    },
    variables: {
      restaurantId,
      message,
      rating
    }
  })

  return [addReview, { loading, error }]
}
