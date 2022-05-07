import { useQuery, useMutation } from "@apollo/client"
import gql from "graphql-tag"

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
      restaurant {
        id
        rating
        numberOfReviews
        reviews {
          message
          rating
          id
        }
      }
    }
  }
`

export function useRestaurants() {
  const { loading, data, error } = useQuery(GET_RESTAURANTS)

  return { loading, error, restaurants: data ? data.restaurants : [] }
}

export function useRestaurant(restaurantId) {
  const { loading, data, error } = useQuery(GET_RESTAURANT, {
    variables: { id: restaurantId }
  })

  return { loading, error, restaurant: data ? data.restaurant : null }
}

export function useAddReview(
  restaurantId,
  message,
  rating,
  onCompleted = () => {}
) {
  const [addReview, { loading, error }] = useMutation(ADD_REVIEW, {
    onError: () => {},
    onCompleted: (data) => {
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
