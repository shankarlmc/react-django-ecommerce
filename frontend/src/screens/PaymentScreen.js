import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CheckoutSteps from "../components/CheckoutSteps";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";

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
  paymentMethod: {
    display: "flex",
    flexDirection: "column",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function PaymentScreen() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState(
    cart.paymentMethod ? cart.paymentMethod : "PayPal"
  );

  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login?redirect=shipping");
    }
    if (cart.cartItems.length === 0) {
      history.push("/");
    }
  }, [dispatch, history, userInfo, cart.cartItems.length]);

  if (!shippingAddress.address) {
    history.push("/shipping");
  }
  const handleGoBackToShipping = () => {
    history.push("/shipping");
  };
  document.title = "SK ONLINE STORE -Select Payment Method";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.layout} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12}>
            <Paper className={classes.paper}>
              <CheckoutSteps step1 step2 step3 />
              <Typography variant="h6" gutterBottom>
                Payment method
              </Typography>
              <div className={classes.paymentMethod}>
                <FormControlLabel
                  value="Esewa"
                  control={<Radio />}
                  label="Pay With Esewa."
                  checked={paymentMethod === "Esewa"}
                  onClick={() => setPaymentMethod("Esewa")}
                />
                <FormControlLabel
                  value="Khalti"
                  control={<Radio />}
                  label="Pay With Khalti."
                  checked={paymentMethod === "Khalti"}
                  onClick={() => setPaymentMethod("Khalti")}
                />
                <FormControlLabel
                  value="PayPal"
                  control={<Radio />}
                  label="Pay With PayPal."
                  checked={paymentMethod === "PayPal"}
                  onClick={() => setPaymentMethod("PayPal")}
                />
                <FormControlLabel
                  value="Cash On Delivery"
                  control={<Radio />}
                  label="Cash On Delivery."
                  checked={paymentMethod === "Cash On Delivery"}
                  onClick={() => setPaymentMethod("Cash On Delivery")}
                />
              </div>

              {/* <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cardName"
                    label="Name on card"
                    fullWidth
                    autoComplete="cc-name"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cardNumber"
                    label="Card number"
                    fullWidth
                    autoComplete="cc-number"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="expDate"
                    label="Expiry date"
                    fullWidth
                    autoComplete="cc-exp"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cvv"
                    label="CVV"
                    helperText="Last three digits on signature strip"
                    fullWidth
                    autoComplete="cc-csc"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox color="secondary" name="saveCard" value="yes" />
                    }
                    label="Remember credit card details for next time"
                  />
                </Grid>
              </Grid> */}

              <React.Fragment>
                <div className={classes.buttons}>
                  <Button
                    className={classes.button}
                    onClick={handleGoBackToShipping}
                  >
                    Back
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={submitHandler}
                  >
                    Place order
                  </Button>
                </div>
              </React.Fragment>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
