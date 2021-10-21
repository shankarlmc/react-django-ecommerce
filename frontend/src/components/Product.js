import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import {
  addToCart,
  addToFavorite,
  removeFromFavorite,
} from "../actions/cartActions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  rating: {
    display: "flex",
    alignItems: "center",
    marginLeft: "0",
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
  price: {
    fontWeight: "400",
    marginTop: "10px",
    marginBottom: "-20px",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

function Product({ product }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const isItemOnCart = (slug) =>
    cartItems.find((x) => x.product === slug) ? true : false;

  const wishList = useSelector((state) => state.wishList);
  const { favoriteItems } = wishList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const isItemOnWishList = (slug) =>
    favoriteItems.find((x) => x.product === slug) ? true : false;

  const addToCartHandler = (slug) => {
    dispatch(addToCart(slug, 1));
  };

  const addToFavoriteHandler = (slug) => {
    if (!userInfo) {
      history.push("/login?redirect=favorite-items");
    } else {
      dispatch(addToFavorite(slug));
    }
  };

  const removeFromFavoriteHandler = (slug) => {
    if (!userInfo) {
      history.push("/login?redirect=favorite-items");
    } else {
      dispatch(removeFromFavorite(slug));
    }
  };

  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Link className={classes.link} to={`/product/${product.slug}`}>
        <CardMedia
          className={classes.cardMedia}
          image={product.image}
          title={product.name}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <div className={classes.rating}>
            <Rating
              name="half-rating"
              defaultValue={product.rating ? parseFloat(product.rating) : 0}
              precision={0.5}
              readOnly
            />
            {/* <Box ml={1}>
              ({product.rating ? Number(product.rating).toFixed(1) : 0} of{" "}
              {product.numReviews} review{product.numReviews > 1 ? "s" : ""})
            </Box> */}
          </div>
          <Typography className={classes.price} variant="h5" component="h3">
            Rs. {product.price}
          </Typography>
        </CardContent>
      </Link>
      <CardActions className={classes.cardActions}>
        <Link to={`/product/${product.slug}`}>
          <Button size="small" color="primary">
            <VisibilityIcon />
          </Button>
        </Link>
        <Button
          size="small"
          color="secondary"
          onClick={
            isItemOnWishList(product.slug)
              ? () => removeFromFavoriteHandler(product.slug)
              : () => addToFavoriteHandler(product.slug)
          }
        >
          {isItemOnWishList(product.slug) && (
            <FavoriteOutlinedIcon color="secondary" />
          )}

          {!isItemOnWishList(product.slug) && (
            <FavoriteBorderRoundedIcon color="primary" />
          )}
        </Button>
        {product.countInStock > 0 ? (
          <Button
            size="small"
            color="primary"
            onClick={() => addToCartHandler(product.slug)}
            disabled={isItemOnCart(product.slug)}
          >
            <AddShoppingCartIcon />
          </Button>
        ) : (
          <Button size="small" color="primary" disabled={true}>
            <AddShoppingCartIcon />
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Product;
