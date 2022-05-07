import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import StarRating from "./StarRating"
import { Link } from "react-router-dom"
import { Button } from "@material-ui/core"
import { getRestaurantImage } from "./RestaurantImages"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
    margin: theme.spacing(),
    width: 450,
    maxWidth: "100%",
    padding: 45,
    [theme.breakpoints.down(480)]: {
      padding: 16
    }
  },
  title: {
    minHeight: 60
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto",
    maxWidth: "100vw"
  },
  cover: {
    width: 140,
    height: 140
  },
  ratings: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: 50
  },
  link: {
    color: "inherit",
    textDecoration: "none"
  },
  description : {
    minHeight: 60
  }
}))

export default function RestaurantPreview({ restaurant }) {
  const { name, rating, address, city, numberOfReviews, id } = restaurant
  const classes = useStyles()

  return (
    <Link className={classes.link} to={`/restaurant/${id}`}>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5" className={classes.title}>
              {name}
            </Typography>
            <div className={classes.ratings}>
              {rating > 0 ? (
                <>
                  <StarRating rating={rating} />{" "}
                  <small>({numberOfReviews})</small>
                </>
              ) : (
                <Button size="small" variant="outlined">
                  review
                </Button>
              )}
            </div>
            <Typography variant="body1" color="textSecondary" className={classes.description}>
              {address} - {city}
            </Typography>
          </CardContent>
        </div>
        <CardMedia
          className={classes.cover}
          image={getRestaurantImage(name)}
          title={name}
        />
      </Card>
    </Link>
  )
}
