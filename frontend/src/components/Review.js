import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down(500)]: {
      flexDirection: "column",
    },
  },
  inline: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down(500)]: {
      flexDirection: "row",
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(6),
  },
  userDetails: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    [theme.breakpoints.down(500)]: {
      width: "100%",
    },
  },
  reviewDate: {
    display: "flex",
    marginTop: "-40px",
    float: "right",
    right: 0,
    [theme.breakpoints.down(500)]: {
      display: "none",
    },
  },
}));

export default function Review({ review }) {
  const classes = useStyles();

  return (
    <ListItem className={classes.root} key={review._id}>
      <div className={classes.userDetails}>
        <ListItemAvatar>
          <Avatar
            alt="shankar"
            src="/images/user.jpeg"
            className={classes.large}
          />
        </ListItemAvatar>
        <ListItemText
          primary={review.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                <Rating
                  name="half-rating"
                  defaultValue={review.rating}
                  precision={0.5}
                  readOnly
                />
                <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
                  ({review.rating} of 5 stars)
                </span>
              </Typography>
              {review.comment}
            </React.Fragment>
          }
        />
      </div>
      <ListItemText
        className={classes.reviewDate}
        primary={review.createdAt.substring(0, 10)}
      />
    </ListItem>
  );
}
