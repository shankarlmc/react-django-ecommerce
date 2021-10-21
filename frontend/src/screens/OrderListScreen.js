import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Chip from "@material-ui/core/Chip";
import CancelIcon from "@material-ui/icons/Cancel";
import DoneIcon from "@material-ui/icons/Done";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  goback: {
    marginTop: "-30px",
    marginBottom: "30px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    marginTop: theme.spacing(2),
  },
  title: {
    fontWeight: 900,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    overflow: "hidden",
  },
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    alignItems: "center",
  },
  body: {
    fontSize: 14,
    alignItems: "center",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function OrderListScreen({ history }) {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //   const userDelete = useSelector((state) => state.userDelete);
  //   const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/");
    }
  }, [dispatch, history, userInfo]);

  const classes = useStyles();
  document.title = "SK ONLINE STORE - Order List";

  return loading ? (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <Container className={classes.cardGrid} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item md={12} sm={12} xs={12} lg={12}>
          <Typography component="h1" variant="h5" className={classes.title}>
            Orders
          </Typography>
          {error ? (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          ) : (
            <TableContainer className={classes.container}>
              <Table
                className={classes.table}
                size="small"
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell>User</StyledTableCell>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>Total Amount</StyledTableCell>
                    <StyledTableCell>Paid</StyledTableCell>
                    <StyledTableCell>Delivered</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {index ? index + 1 : 1}
                      </StyledTableCell>
                      <StyledTableCell>
                        {order.user && order.user.name}
                      </StyledTableCell>
                      <StyledTableCell>
                        {order.createdAt.substring(0, 10)}
                      </StyledTableCell>
                      <StyledTableCell>Rs. {order.totalPrice}</StyledTableCell>
                      <StyledTableCell>
                        {order.isPaid ? (
                          <Chip
                            size="small"
                            label={order.paidAt.substring(0, 10)}
                            color="primary"
                            icon={<DoneIcon />}
                          />
                        ) : (
                          <Chip
                            size="small"
                            color="secondary"
                            icon={<CancelIcon />}
                          />
                        )}
                      </StyledTableCell>
                      <StyledTableCell>
                        {order.isDelivered ? (
                          <Chip
                            size="small"
                            label={order.deliveredAt.substring(0, 10)}
                            color="primary"
                            icon={<DoneIcon />}
                          />
                        ) : (
                          <Chip
                            size="small"
                            color="secondary"
                            icon={<CancelIcon />}
                          />
                        )}
                      </StyledTableCell>

                      <StyledTableCell>
                        <Link to={`/order/${order._id}`}>
                          <Button variant="contained" color="primary">
                            Details
                          </Button>
                        </Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default OrderListScreen;
