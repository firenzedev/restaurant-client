import React from "react"
import Rating from "@material-ui/lab/Rating"

export default function StarRating({
  rating = 0,
  readOnly = true,
  onChange = () => {}
}) {
  const [value, setValue] = React.useState(rating)

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
