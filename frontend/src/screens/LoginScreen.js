import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -60%)",
  },
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  forget: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forgetPassword: {
    textDecoration: "none",
    marginTop: "12px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginScreen() {
  const [state, setState] = useState({ errors: {} });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const search = useLocation().search;
  const url = new URLSearchParams(search).get("redirect");
  const redirect = url ? url : "/profile";
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      dispatch(login(email, password));
    }
  };
  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    if (email === "") {
      formIsValid = false;
      errors["email"] = "Email should not be empty.";
    }
    if (typeof email !== "undefined") {
      if (!email.match(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/)) {
        formIsValid = false;
        errors["email"] = "Please Enter the valid email address.";
      }
    }
    if (password === "") {
      formIsValid = false;
      errors["password"] = "Password should not be empty.";
    }

    setState({ errors: errors });
    return formIsValid;
  };
  const classes = useStyles();
  document.title = "SK ONLINE STORE - LOGIN HERE";
  return (
    <Container maxWidth="xs" className={classes.container}>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login Here
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitHandler}>
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
            error={state.errors["email"] ? true : false}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={state.errors["email"] ? state.errors["email"] : ""}
          />
          <TextField
            error={state.errors["password"] ? true : false}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={
              state.errors["password"] ? state.errors["password"] : ""
            }
          />
          <div className={classes.forget}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Link
              to="/forget-password"
              className={classes.forgetPassword}
              variant="body2"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container style={{ justifyContent: "center" }}>
            <Grid item>
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                variant="body2"
              >
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
