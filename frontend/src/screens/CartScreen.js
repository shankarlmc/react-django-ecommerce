import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItems from "../components/CartItems";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(1),
  },
  goback: {
    marginTop: "-30px",
  },
  cartItem: {
    boxShadow: "rgba(43, 52, 69, 0.1) 0px 4px 16px",
    borderRadius: "10px",
    backgroundColor: "rgb(255, 255, 255)",
    overflow: "hidden",
    marginLeft: "20px",
  },
  cardHeader: {
    display: "flex",
    margin: "10px",
    padding: "10px",
    width: "100%",
    borderBottom: "1px solid #F3F5F9",
    alignItems: "center",
    justifyContent: "space-between",
    height: "30px",
  },
  total: {
    fontWeight: "bold",
    color: "#7D879C",
  },
  totalPrice: {
    fontWeight: "600",
    marginRight: "20px",
  },
  cardContents: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
    margin: "0 0 10px 10px",
    padding: "10px",
  },
  additionalinfo: {
    width: "100%",
    display: "flex",
    fontSize: "18px",
  },
  additionalinfotextarea: {
    width: "100%",
    marginRight: "10px",
  },
  checkoutLink: {
    width: "200px",
    textDecoration: "none",
  },
  checkoutBtn: {
    width: "100%",
  },
  emptyCart: {
    marginTop: "20px",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    letterSpacing: "1px",
    borderRadius: "8px",
  },
  emptyCartTitle: {
    padding: "10px",
  },
  emptyCartSubTitle: {
    padding: "10px",
    marginBottom: "10px",
  },
  emptyCartBtn: {
    padding: "8px",
    alignItems: "center",
  },
}));

function CartScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const classes = useStyles();

  document.title = "SK ONLINE STORE - CART PAGE";

  const handleContinueShopping = () => {
    history.push("/");
  };

  return (
    <Container className={classes.cardGrid} maxWidth="lg">
      {cartItems.length !== 0 && (
        <Grid className={classes.goback} item xs={12}>
          <Link to="/">
            <Button
              color="primary"
              variant="contained"
              startIcon={<ArrowBackIosIcon />}
            >
              Go Back
            </Button>
          </Link>
        </Grid>
      )}

      <Grid container spacing={0}>
        {cartItems.length === 0 ? (
          <Grid
            item
            md={8}
            sm={12}
            xs={12}
            lg={12}
            className={classes.emptyCart}
          >
            <img
              src="https://i.imgur.com/dCdflKN.png"
              width="130"
              height="130"
              alt="empty-cart"
            />
            <Typography
              className={classes.emptyCartTitle}
              variant="h4"
              component="h2"
            >
              Your Cart Is Empty
            </Typography>
            <Typography
              className={classes.emptyCartSubTitle}
              variant="h5"
              component="h4"
            >
              Add Something to make me happy :)
            </Typography>
            <Button
              className={classes.emptyCartBtn}
              color="primary"
              variant="contained"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </Button>
          </Grid>
        ) : (
          <>
            <Grid item md={8} sm={12} xs={12} lg={8}>
              {cartItems.map((item) => (
                <Grid item md={12} sm={12} xs={12} lg={12} key={item.product}>
                  <CartItems product={item} />
                </Grid>
              ))}
            </Grid>
            <Grid item md={4} sm={12} xs={12} lg={4}>
              <Card className={classes.cartItem}>
                <div className={classes.cardHeader}>
                  <Typography
                    className={classes.total}
                    variant="body2"
                    component="span"
                  >
                    Subtotal(
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} items):
                  </Typography>
                  <Typography
                    className={classes.totalPrice}
                    variant="body2"
                    component="span"
                  >
                    Rs.{" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </Typography>
                </div>
                <div className={classes.cardContents}>
                  {/* <Typography
                    className={classes.additionalinfo}
                    variant="h4"
                    component="h4"
                  >
                    Additional Comments
                  </Typography>

                  <TextareaAutosize
                    className={classes.additionalinfotextarea}
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Minimum 3 rows"
                  /> */}
                  <Link to="/shipping" className={classes.checkoutLink}>
                    <Button
                      className={classes.checkoutBtn}
                      color="primary"
                      variant="contained"
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                </div>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}

export default CartScreen;
