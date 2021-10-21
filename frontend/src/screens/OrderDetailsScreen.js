import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TableContainer from "@material-ui/core/TableContainer";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Alert from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, deliverOrder } from "../actions/orderActions";
import { ORDER_DELIVER_RESET } from "../constants/orderConstants";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    overflow: "hidden",
  },
  title: {
    fontWeight: 900,
  },
  rowItems: {
    border: 0,
  },
  buttonProgress: {
    color: "#f20c32",
    position: "absolute",
    marginTop: 30,
    marginLeft: -120,
  },
}));

function OrderDetailsScreen({ match, history }) {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login?redirect=profile");
    }
    if (!order || order._id !== Number(orderId) || successDeliver) {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, history, userInfo, order, orderId, successDeliver]);

  if (!loading && !error && order) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  const handleDeliver = () => {
    dispatch(deliverOrder(order));
  };
  const classes = useStyles();

  document.title = "SK ONLINE STORE - ORDER DETAIL";

  return loading ? (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : error ? (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.layout} maxWidth="md">
        <Grid item xs={12} sm={12} md={12}>
          <Alert style={{ marginTop: "10%" }} severity="error">
            {error}
          </Alert>
        </Grid>
      </Container>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.layout} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8}>
            <Paper className={classes.paper}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={classes.title}
                  >
                    User Details
                  </Typography>
                  <Typography gutterBottom>
                    {userInfo ? userInfo.name : ""}
                  </Typography>
                  <Typography gutterBottom>
                    {userInfo ? userInfo.email : ""}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={classes.title}
                  >
                    Shipping Address
                  </Typography>
                  <Typography gutterBottom>
                    {order.shippingAddress.address} {order.shippingAddress.city}
                    , {order.shippingAddress.state}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h4"
                    style={{ marginRight: "20px" }}
                  >
                    {order.isDelivered ? (
                      <Alert variant="filled" severity="success">
                        Delivered on {order.deliveredAt.substring(0, 10)}
                      </Alert>
                    ) : (
                      <Alert variant="filled" severity="warning">
                        Not Delivered.
                      </Alert>
                    )}
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
                    variant="h5"
                    gutterBottom
                    className={classes.title}
                  >
                    Payment Method
                  </Typography>
                  <Grid container>
                    <React.Fragment>
                      <Grid item xs={12}>
                        <Typography gutterBottom>
                          Method: {order.paymentMethod}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h4"
                          style={{ marginRight: "20px" }}
                        >
                          {order.isPaid ? (
                            <Alert variant="filled" severity="success">
                              Paid on {order.paidAt.substring(0, 10)}
                            </Alert>
                          ) : (
                            <Alert variant="filled" severity="warning">
                              Not Paid.
                            </Alert>
                          )}
                        </Typography>
                      </Grid>
                    </React.Fragment>
                  </Grid>
                </Grid>
                <Divider variant="inset" />
                <Grid item container direction="row" xs={12} sm={12} md={12}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={classes.title}
                  >
                    Order Items:
                  </Typography>

                  {order.orderItems.length === 0 ? (
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
                          {order.orderItems.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell
                                align="left"
                                className={classes.rowItems}
                              >
                                <img
                                  src={item.image}
                                  className={classes.productImage}
                                  alt={item.name}
                                />
                              </TableCell>
                              <TableCell
                                align="left"
                                className={classes.rowItems}
                              >
                                {item.name}
                              </TableCell>
                              <TableCell
                                align="right"
                                className={classes.rowItems}
                              >
                                {item.qty} ✕ {item.price} = Rs.{" "}
                                {(item.qty * item.price).toFixed(2)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={4} style={{ marginBottom: "20px" }}>
            <Paper className={classes.paper}>
              <Typography variant="h5" gutterBottom className={classes.title}>
                Order Summary
              </Typography>
              <Divider />
              <TableContainer className={classes.container}>
                <Table size="small" aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell align="left" className={classes.rowItems}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={classes.title}
                        >
                          Items:
                        </Typography>
                      </TableCell>
                      <TableCell align="right" className={classes.rowItems}>
                        Rs. {order.itemsPrice}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" className={classes.rowItems}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={classes.title}
                        >
                          Shipping:
                        </Typography>
                      </TableCell>
                      <TableCell align="right" className={classes.rowItems}>
                        Rs. {order.shippingPrice} /-
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" className={classes.rowItems}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={classes.title}
                        >
                          Tax:
                        </Typography>
                      </TableCell>
                      <TableCell align="right" className={classes.rowItems}>
                        Rs. {order.taxPrice}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" className={classes.rowItems}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={classes.title}
                        >
                          Total:
                        </Typography>
                      </TableCell>
                      <TableCell align="right" className={classes.rowItems}>
                        Rs. {order.totalPrice} /-
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<CheckCircleIcon />}
                    onClick={handleDeliver}
                    disabled={loadingDeliver}
                  >
                    Mark As Delivered
                  </Button>
                )}
              {loadingDeliver && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default OrderDetailsScreen;
