import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TableContainer from "@material-ui/core/TableContainer";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  productImage: {
    width: "50px",
    height: "50px",
    borderRadius: "5px",
    [theme.breakpoints.down(540)]: {
      width: "50px",
      height: "50px",
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  table: {
    minWidth: 500,
  },
  container: {
    marginTop: "20px",
  },
  tablerows: {
    border: 0,
    fontWeight: 700,
    fontSize: "18px",
  },
}));

function PlaceOrderScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);

  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login?redirect=shipping");
    }
  }, [dispatch, history, userInfo]);

  cart.itemPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  cart.shippingPrice = (cart.itemPrice > 10000 ? 0 : 100).toFixed(2);
  cart.taxPrice = Number(0.13 * cart.itemPrice).toFixed(2);
  cart.totalPrice = (
    Number(cart.itemPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const classes = useStyles();

  const handleGoToPaymentScreen = () => {
    history.push("/payment");
  };
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  const handleModelClose = () => {
    history.push(`/order/${order._id}`);
    dispatch({ type: ORDER_CREATE_RESET });
  };

  const handleViewDetails = () => {
    dispatch({ type: ORDER_CREATE_RESET });
    history.push(`/profile`);
  };
  document.title = "SK ONLINE STORE - Place your order";
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.layout} maxWidth="md">
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12}>
            <Paper className={classes.paper}>
              {error && <Alert severity="error">{error}</Alert>}

              <CheckoutSteps step1 step2 step3 step4 />

              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    className={classes.title}
                  >
                    User Details
                  </Typography>
                  <Typography gutterBottom>
                    {userInfo ? userInfo.name : ""}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    className={classes.title}
                  >
                    Shipping Address
                  </Typography>
                  <Typography gutterBottom>
                    {cart.shippingAddress.address} {cart.shippingAddress.city},{" "}
                    {cart.shippingAddress.state}
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  direction="column"
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    className={classes.title}
                  >
                    Payment Method
                  </Typography>
                  <Grid container>
                    <React.Fragment>
                      <Grid item xs={6}>
                        <Typography gutterBottom>
                          {cart.paymentMethod}
                        </Typography>
                      </Grid>
                    </React.Fragment>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  style={{
                    border: "1px solid #808080",
                    margin: "20px 0 20px 0",
                  }}
                ></Grid>
                <Grid item container direction="row" xs={12} sm={12} md={12}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    className={classes.title}
                  >
                    Order Items
                  </Typography>
                  {cart.cartItems.length === 0 ? (
                    <Grid
                      item
                      container
                      direction="row"
                      xs={12}
                      sm={12}
                      md={12}
                    >
                      <Alert severity="warning">Your Cart is Empty.</Alert>
                    </Grid>
                  ) : (
                    <TableContainer className={classes.container}>
                      <Table
                        className={classes.table}
                        size="small"
                        aria-label="simple table"
                      >
                        <TableBody>
                          {cart.cartItems.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell align="left">
                                <img
                                  src={item.image}
                                  className={classes.productImage}
                                  alt={item.name}
                                />
                              </TableCell>
                              <TableCell align="left">{item.name}</TableCell>
                              <TableCell align="right">
                                {item.qty} ✕ {item.price} = Rs.{" "}
                                {(item.qty * item.price).toFixed(2)}
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell
                              className={classes.tablerows}
                              rowSpan={4}
                            />
                            <TableCell
                              className={classes.tablerows}
                              align="right"
                            >
                              Subtotal:
                            </TableCell>
                            <TableCell
                              className={classes.tablerows}
                              align="right"
                            >
                              Rs. {cart.itemPrice} /-
                            </TableCell>
                          </TableRow>
                          <TableRow style={{ border: 0 }}>
                            <TableCell
                              className={classes.tablerows}
                              align="right"
                            >
                              Tax:
                            </TableCell>
                            <TableCell
                              className={classes.tablerows}
                              align="right"
                            >
                              13% (Rs. {cart.taxPrice})
                            </TableCell>
                          </TableRow>
                          <TableRow style={{ border: 0 }}>
                            <TableCell
                              className={classes.tablerows}
                              align="right"
                            >
                              Shipping Price:
                            </TableCell>
                            <TableCell
                              className={classes.tablerows}
                              align="right"
                            >
                              Rs. {cart.shippingPrice} /-
                            </TableCell>
                          </TableRow>
                          <TableRow style={{ border: 0 }}>
                            <TableCell
                              className={classes.tablerows}
                              align="right"
                            >
                              Total:
                            </TableCell>
                            <TableCell
                              className={classes.tablerows}
                              align="right"
                            >
                              Rs. {cart.totalPrice} /-
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Grid>
              </Grid>
              <React.Fragment>
                <div className={classes.buttons}>
                  <Button
                    className={classes.button}
                    onClick={handleGoToPaymentScreen}
                  >
                    Back
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={cart.cartItems.length === 0}
                    onClick={handlePlaceOrder}
                  >
                    Place order
                  </Button>
                </div>
              </React.Fragment>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {success && (
        <Dialog
          open={true}
          TransitionComponent={Transition}
          keepMounted
          fullWidth={true}
          maxWidth="xs"
          onClose={handleModelClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Thank you for your order."}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Your order number is <strong>#{order._id}</strong>. We have
              emailed your order confirmation in
              <strong> {userInfo ? userInfo.email : ""}</strong>, and will send
              you an update when your order has shipped.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleViewDetails}
              variant="contained"
              color="primary"
            >
              Go to Profile
            </Button>
            <Button
              onClick={handleModelClose}
              variant="contained"
              color="secondary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
}

export default PlaceOrderScreen;
