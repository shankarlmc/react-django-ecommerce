import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(1),
  },
  goback: {
    marginTop: "-30px",
  },
  cartItem: {
    display: "flex",
    overflow: "hidden",
    position: "relative",
    boxShadow: "rgba(43, 52, 69, 0.1) 0px 4px 16px",
    borderRadius: "10px",
    marginBottom: "10px",
    backgroundColor: "rgb(255, 255, 255)",
    marginTop: "20px",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  product_image: {
    display: "block",
    maxWidth: "150px",
    maxHeight: "150px",
    padding: "10px",
    borderRadius: "20px",
  },
  product_title: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    lineHeight: "1.5",
    fontWeight: "500",
    fontSize: "20px",
    top: "1.5rem",
    width: "100%",
  },
  delete_product: {
    position: "absolute",
    right: "1rem",
    top: "1rem",
  },
  product_details: {
    width: "100%",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  product_price_inc_dec: {
    display: "flex",
    overflow: "hidden",
    flexDirection: "row",
    padding: "30px 0 0 4px",
    width: "100%",
  },
  product_price: {
    display: "flex",
  },
  product_price_qty: {
    lineHeight: 1.5,
    color: "#7D879C",
    marginRight: "8px",
  },
  product_price_multiply_by_qty: {
    lineHeight: 1.5,
    color: "#D23F57",
    marginRight: "16px",
    fontWeight: "600",
  },
  addToCart: {
    marginTop: "20px",
  },
  product_qty_inc_dec: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    right: "1rem",
    bottom: "1rem",
    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap",
    },
  },
  dec_product: {
    width: "2px",
  },
  product_qty: {
    lineHeight: 1.5,
    marginLeft: "8px",
    marginRight: "8px",
    fontWeight: "600",
    fontSize: "15px",
  },
  btn: {
    cursor: "pointer",
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
  },
}));

function CartItems({ product }) {
  const [isItemRemoveFromCart, setIsItemRemoveFromCart] = useState(false);

  const dispatch = useDispatch();

  const deleteCartItem = (productId) => {
    dispatch(removeFromCart(productId));
    setIsItemRemoveFromCart(true);
  };
  const cartItemIncHandler = (productId, qty) => {
    dispatch(addToCart(productId, qty + 1));
    setIsItemRemoveFromCart(false);
  };
  const cartItemDecHandler = (productId, qty) => {
    dispatch(addToCart(productId, qty - 1));
    setIsItemRemoveFromCart(true);
  };
  const classes = useStyles();

  return (
    <>
      {isItemRemoveFromCart && (
        <Message variant="success">Item Removed from cart Successfully</Message>
      )}
      <Card className={classes.cartItem}>
        <img
          src={product.image}
          alt={product.name}
          className={classes.product_image}
        />
        <div className={classes.product_details}>
          <Link
            to={`/product/${product.product}`}
            style={{ textDecoration: "none" }}
          >
            <Typography
              className={classes.product_title}
              variant="body2"
              component="span"
            >
              {product.name}
            </Typography>
          </Link>
          <div className={classes.delete_product}>
            <IconButton
              aria-label="delete"
              className={classes.btn}
              onClick={() => deleteCartItem(product.product)}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className={classes.product_price_inc_dec}>
            <div className={classes.product_price}>
              <Typography
                className={classes.product_price_qty}
                variant="body2"
                component="span"
              >
                Rs. {product.price} x {product.qty}
              </Typography>
              <Typography
                className={classes.product_price_multiply_by_qty}
                color="error"
                variant="body2"
                component="span"
              >
                Rs. {(product.price * product.qty).toFixed(2)}
              </Typography>
            </div>
            <div className={classes.product_qty_inc_dec}>
              <Button
                onClick={() => cartItemDecHandler(product.product, product.qty)}
                className={classes.btn}
                variant="outlined"
                disabled={product.qty === 1}
                color="primary"
              >
                <RemoveIcon />
              </Button>
              <Typography
                className={classes.product_qty}
                variant="body2"
                component="span"
              >
                {product.qty}
              </Typography>
              <Button
                onClick={() => cartItemIncHandler(product.product, product.qty)}
                variant="outlined"
                color="primary"
                disabled={product.countInStock === product.qty}
                className={classes.btn}
              >
                <AddIcon />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default CartItems;
