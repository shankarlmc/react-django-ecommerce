import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../actions/userActions";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { USER_UPDATE_RESET } from "../constants/userConstants";

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

function UserEditScreen({ match, history }) {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // const history = useHistory();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { error: errorUpdate, success: successUpdate } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login?redirect=userlist");
    } else if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== Number(userId)) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [userInfo, user, userId, dispatch, history, successUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser({ _id: user._id, name, email, isAdmin }));
  };
  const classes = useStyles();
  document.title = "Edit User details";

  return loading ? (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <Container className={classes.cardGrid} maxWidth="lg">
      <Grid className={classes.goback} item xs={12}>
        <Link to="/admin/userlist">
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
        <Grid item md={4} sm={12} xs={12} lg={8}>
          <div style={{ position: "sticky", top: "100px" }}>
            <Typography component="h1" variant="h5" className={classes.title}>
              Edit User Details
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              {errorUpdate && (
                <Alert
                  severity="success"
                  color="success"
                  style={{ marginBottom: "15px" }}
                >
                  {errorUpdate}
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
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    name="isAdmin"
                    color="primary"
                  />
                }
                label="Is Admin"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Update User Details
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserEditScreen;
