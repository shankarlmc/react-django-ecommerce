import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import Product from "../components/Product";
import HomeScreenLoader from "../components/HomeScreenLoader";
import Message from "../components/Message";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  emptyWishList: {
    marginTop: "20px",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    letterSpacing: "1px",
    borderRadius: "8px",
  },
  emptyWishTitle: {
    padding: "10px",
  },
  emptyWishListSubTitle: {
    padding: "10px",
    marginBottom: "10px",
  },
  emptyWishListBtn: {
    padding: "8px",
    alignItems: "center",
  },
}));

function MyWishList({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading } = productList;

  const wishList = useSelector((state) => state.wishList);
  const { favoriteItems } = wishList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login?redirect=favorite-items");
    }
  }, [dispatch, history, userInfo]);

  const classes = useStyles();

  const data = [0, 1, 2, 3, 4, 5, 6, 7];

  document.title = "SK ONLINE STORE - My Wish List";

  const handleContinueShopping = () => {
    history.push("/");
  };

  return (
    <Container className={classes.cardGrid} maxWidth="lg">
      <Grid container spacing={4}>
        {favoriteItems.length !== 0 && (
          <Grid item xs={12} sm={12} md={12} style={{ marginLeft: "0px" }}>
            <Typography variant="h4" gutterBottom>
              My Wish List
            </Typography>
          </Grid>
        )}

        {loading ? (
          data.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <HomeScreenLoader item={item} />
            </Grid>
          ))
        ) : error ? (
          <Message variant="error">{error}</Message>
        ) : favoriteItems.length === 0 ? (
          <Grid
            item
            md={8}
            sm={12}
            xs={12}
            lg={12}
            className={classes.emptyWishList}
          >
            <img
              src="/images/empty-wishlist-icon.png"
              width="130"
              height="130"
              alt="empty-cart"
            />
            <Typography
              className={classes.emptyWishListTitle}
              variant="h4"
              component="h2"
            >
              Your WishList Is Empty
            </Typography>
            <Typography
              className={classes.emptyWishListSubTitle}
              variant="h5"
              component="h4"
            >
              Add Something to make me happy :)
            </Typography>
            <Button
              className={classes.emptyWishListBtn}
              color="primary"
              variant="contained"
              onClick={handleContinueShopping}
            >
              Add To Wishlist
            </Button>
          </Grid>
        ) : (
          favoriteItems.map((product, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <Product product={product} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default MyWishList;
