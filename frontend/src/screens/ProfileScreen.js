import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Chip from "@material-ui/core/Chip";
import CancelIcon from "@material-ui/icons/Cancel";
import DoneIcon from "@material-ui/icons/Done";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(1),
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

function ProfileScreen({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // const history = useHistory();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login?redirect=profile");
    } else {
      dispatch(listMyOrders());
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  // console.log(userInfo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match.");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("Profile Updated Successfully.");
    }
  };
  const classes = useStyles();
  document.title = name;

  return loading ? (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <Container className={classes.cardGrid} maxWidth="lg">
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
      <Grid container spacing={3}>
        <Grid item md={4} sm={12} xs={12} lg={4}>
          <div style={{ position: "sticky", top: "100px" }}>
            <Typography component="h1" variant="h5" className={classes.title}>
              User Profile
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              {message && (
                <Alert
                  severity="success"
                  color="success"
                  style={{ marginBottom: "15px" }}
                >
                  {message}
                </Alert>
              )}
              {error && (
                <Alert
                  severity="error"
                  color="error"
                  style={{ marginBottom: "15px" }}
                >
                  {error}
                </Alert>
              )}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="fname"
                label="Full Name"
                name="fname"
                autoComplete="fname"
                autoFocus
                value={name}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                disabled
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="cpassword"
                label="Confirm Password"
                type="password"
                id="cpassword"
                autoComplete="cpassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Update Info
              </Button>
            </form>
          </div>
        </Grid>
        <Grid item md={8} sm={12} xs={12} lg={8}>
          <Typography component="h1" variant="h5" className={classes.title}>
            My Orders
          </Typography>
          {loadingOrders ? (
            <CircularProgress />
          ) : errorOrders ? (
            <Alert variant="filled" severity="error">
              {errorOrders}
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
                    <StyledTableCell>Ordered Date</StyledTableCell>
                    <StyledTableCell>Total</StyledTableCell>
                    <StyledTableCell>Paid</StyledTableCell>
                    <StyledTableCell>Delivered</StyledTableCell>
                    <StyledTableCell>Details</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {index ? index + 1 : 1}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item.createdAt.substring(0, 10)}
                      </StyledTableCell>
                      <StyledTableCell>Rs. {item.totalPrice}</StyledTableCell>
                      <StyledTableCell>
                        {item.isPaid ? (
                          <Chip
                            size="small"
                            label={item.paidAt.substring(0, 10)}
                            color="primary"
                            icon={<DoneIcon />}
                          />
                        ) : (
                          <Chip
                            size="small"
                            label="Not Paid"
                            color="secondary"
                            icon={<CancelIcon />}
                          />
                        )}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item.isDelivered ? (
                          <Chip
                            size="small"
                            label={item.deliveredAt.substring(0, 10)}
                            color="primary"
                            icon={<DoneIcon />}
                          />
                        ) : (
                          <Chip
                            size="small"
                            label="Not Delivered"
                            color="secondary"
                            icon={<CancelIcon />}
                          />
                        )}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Link to={`/order/${item._id}`}>
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

export default ProfileScreen;
