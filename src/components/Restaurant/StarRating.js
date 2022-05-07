import React, { useEffect } from "react"
import Rating from "@material-ui/lab/Rating"

export default function StarRating({
  rating = 0,
  readOnly = true,
  onChange = () => {}
}) {
  const [value, setValue] = React.useState(rating)

  useEffect(() => {
    setValue(rating)
  }, [rating])

  return (
    <Rating
      name="rating"
      value={value}
      readOnly={readOnly}
      onChange={(event, newValue) => {
        setValue(newValue)
        onChange(newValue)
      }}
    />
  )
}
